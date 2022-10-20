const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
chai.use(sinonChai);
const ExpressMock = require('@n4l/express-app-mock');
const internalRoutes = require('../../../src/routes/internal');

describe('Internal Routes Unit Tests', () => {

    beforeEach(async() => {
    });

    afterEach(async() => {
        sinon.restore();
    });

    after(async() => {});

    it('mount routes successfully', async() => {
        const app = ExpressMock();
        internalRoutes(app);
    });
});