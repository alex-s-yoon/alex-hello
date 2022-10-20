const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { determineVersion } = require('@n4l/container-utils');
const pjson = require('../../package.json');

module.exports = async(app, log) => {
    // Like the one described here: https://swagger.io/specification/#infoObject
    const options = require('../../swagger.json');
    options.swaggerDefinition.info.version = await determineVersion(pjson);

    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
