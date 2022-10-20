const config = require('../config');

module.exports = require('@n4l/microservice-builder').logger({ env: config.get('env'), logLevel: config.get('logLevel') });
