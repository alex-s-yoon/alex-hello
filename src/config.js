const convict = require('convict');
const convictFormatWithValidator = require('convict-format-with-validator');
// Add all formats
convict.addFormats(convictFormatWithValidator);

// Define a schema
const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test', 'demo', 'ci', 'local'],
        default: 'local',
        env: 'NODE_ENV',
        arg: 'env'
    },
    ip: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '0.0.0.0',
        env: 'IP_ADDRESS'
    },
    logLevel: {
        doc: 'Logging level for this service',
        format: '*',
        default: 'debug',
        env: 'LOG_LEVEL',
        arg: 'log-level'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    },
    apm: {
        uri: {
            doc: 'Hostname and port of the APM server',
            format: '*',
            default: 'http://localhost:8200',
            env: 'APM_URI',
            arg: 'apm-uri'
        },
        token: {
            doc: 'Token if required for the APM server',
            format: '*',
            default: '',
            env: 'APM_TOKEN',
            arg: 'apm-token'
        },
        enabled: {
            doc: 'Enable/Disabled the APM module default false',
            format: 'Boolean',
            default: false,
            env: 'APM_ENABLED',
            arg: 'apm-enabled'
        }
    },
    messaging: {
        uri: {
            doc: 'Hostname and port of the Rabbit MQ server',
            format: '*',
            default: 'amqp://localhost',
            env: 'MESSAGING_URI',
            arg: 'msg-uri'
        },
        user: {
            doc: 'User to login to rabbitmq',
            format: '*',
            default: 'guest',
            env: 'MESSAGING_USER',
            arg: 'msg-user'
        },
        pass: {
            doc: 'Pass to login to rabbitmq',
            format: '*',
            default: 'guest',
            env: 'MESSAGING_PASS',
            arg: 'msg-pass'
        }
    },
    db: {
        maxRetry: {
            doc: 'maximum retry attempts',
            format: 'int',
            default: 2,
            env: 'DB_MAX_RETRY'
        },
        name: {
            doc: 'database name',
            format: '*',
            default: 'n4l-microservice-template'
        },
        uri: {
            doc: 'database uri',
            format: '*',
            default: 'mongodb:27017',
            env: 'DB_URI'
        },
        username: {
            doc: 'username for database',
            format: '*',
            default: null,
            env: 'DB_USER'
        },
        pass: {
            doc: 'password for database',
            format: '*',
            default: null,
            env: 'DB_PASS'
        },
        opts: {
            doc: 'Additional options for mongodb connection',
            format: '*',
            default: 'replicaSet=rs1',
            env: 'DB_OPTS'
        }
    },
    cors: {
        doc: 'CORS origin which defaults to *',
        format: '*',
        default: '*',
        env: 'CORS',
        arg: 'cors'
    },
    https: {
        doc: 'Enable HTTPS or not',
        format: 'Boolean',
        default: false,
        env: 'HTTPS'
    },
    secret: {
        doc: 'jwt secret key',
        format: '*',
        default: 'supersecret',
        env: 'SECRET_KEY',
        sensitive: true
    },
    api: {
        requestBodySize: {
            doc: 'The max request body size for the API',
            format: '*',
            default: '2mb',
            env: 'API_REQUEST_BODY_SIZE'
        },
        maxNumberOfParameters: {
            doc: 'Controls the maximum number of parameters that are allowed in the URL-encoded data. If a request contains more parameters than this value, a 413 will be returned to the client. Defaults to 1000',
            format: '*',
            default: 1000,
            env: 'API_MAX_PARAMETERS'
        }
    }
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`./src/config/${ env }.json`);

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
