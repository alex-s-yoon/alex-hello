const config = require('./src/config.js');
const pjson = require('./package.json');
const { getContainerId, determineVersionSync } = require('@n4l/container-utils');
const containerId = getContainerId();
const version = determineVersionSync(pjson);

require('elastic-apm-node').start({
    serviceName: 'n4l-microservice-template',
    secretToken: config.get('apm').token,
    serverUrl: config.get('apm').uri,
    serviceVersion: `${version.major}.${version.minor}.${version.patch}`,
    active: config.get('apm').enabled,
    containerId: containerId ? containerId : undefined,
    ignoreUrls: ['/version'],
});

const expressWinston = require('express-winston');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');
const path = require('path');
const express = require('express');
const n4lExpressLogger = require('@n4l/microservice-builder').expressLogger({ env: config.get('env')});

const createServer = (config) => {
    let server;
    if (!config.get('https')) {
        server = http.createServer(app);
    } else {
        const options = {
            key: fs.readFileSync(path.join(process.cwd(), 'server.key')),
            cert: fs.readFileSync(path.join(process.cwd(), 'server.cert')),
        };
        server = https.createServer(options, app);
    }
    return server;
};

const registerExitHandler = (exitHandler) => {
    //do something when app is closing
    process.on('exit', exitHandler.bind(null, { cleanup: true }));

    //catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, { exit: true }));

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
    process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
};

const logger = require('./src/utils/logger');
const app = express();
const dbPromise = require('./src/models/db')(config.get('db'));
let dbConnection = null;

// CORS middleware
const corsOptions = {
    origin: config.get('cors'),
};

app.use(cors(corsOptions));

app.use(expressWinston.logger(n4lExpressLogger));

app.use(express.json({ limit: config.get('api').requestBodySize }));
app.use(
    express.urlencoded({
        extended: true,
        limit: config.get('api').requestBodySize,
        parameterLimit: config.get('api').maxNumberOfParameters
    })
);

require('./src/routes/internal')(app);
require('./src/routes/docs-routes')(app, logger);

//TOOD more endpoints

app.use(expressWinston.errorLogger(n4lExpressLogger));

registerExitHandler(async (options, exitCode) => {
    //TODO cleanup code

    if (options.exit) {
        if (dbConnection) {
            await dbConnection.disconnect();
        }
        process.exit();
    }
});

const server = createServer(config);
const port = config.get('port');
const isInTest = typeof global.it === 'function';
if (isInTest) {
    module.exports = server.listen(port, () => {
        logger.info(`listening on port ${port}!`);
    });
} else {
    dbPromise.then((connection) => {
        dbConnection = connection;
        server.listen(port, () => {
            logger.info(`listening on port ${port}!`);
        });
    });
}
