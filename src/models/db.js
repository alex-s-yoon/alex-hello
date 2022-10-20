const mongoose = require('mongoose');
const logger = require('../utils/logger');
const apm = require('elastic-apm-node');

const buildCs = (db) => {
    let cs = 'mongodb://';

    if (db.username && db.pass) {
        cs = `${cs }${db.username}:${db.pass}@`;
    }

    cs = `${cs }${db.uri}/${db.name}`;

    if (db.opts) {
        cs = `${cs }?${db.opts}`;
    }
    return cs;
};

module.exports = async (config, timeout = 2000) => {
    const cs = buildCs(config);

    const maxRetry = config.maxRetry || 2;
    let attempt = 0;
    while (true) {
        attempt = attempt + 1;
        logger.info(`mongodb connection attempt ${attempt}`);
        try {
            const c = await mongoose.connect(cs, { useFindAndModify: false, useNewUrlParser: true, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000, poolSize: 10, bufferMaxEntries: 0 });
            logger.info('connection established to mongodb');
            return c;
        } catch (err) {
            apm.captureError(err);
            if (attempt <= maxRetry) {
                logger.warn(`error connecting to mongodb ${err.message}`, {err});
                await new Promise(r => setTimeout(r, timeout));
            } else {
                throw err;
            }
        }
    }
};
