const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
chai.use(sinonChai);
const ExpressMock = require('@n4l/express-app-mock');
const docsRoutes = require('../../../src/routes/docs-routes');

describe('Docs Routes Unit Tests', () => {

    beforeEach(async() => {
    });

    afterEach(async() => {
        sinon.restore();
    });

    after(async() => {});

    it('mount routes successfully', async() => {
        const app = ExpressMock();
        docsRoutes(app);
    });
});