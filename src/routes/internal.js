const { version } = require('./handlers/internal-handlers');
/**
 * @swagger
 *
 * components:
 *   schemas:
 *      Version:
 *          type: object
 *          properties:
 *              major:
 *                  type: integer
 *              minor:
 *                  type: integer
 *              patch:
 *                  type: integer
 *              label:
 *                  type: string
 *                  example: beta
 */

module.exports = (app) => {
    /**
     * @swagger
     * /version:
     *    get:
     *      description: This should return the current version of the service
     *      responses:
     *         200:
     *           description: version
     *           content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Version'
     */
    app.get('/version', version);
};