const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
chai.use(sinonChai);
const { version, reset } = require('../../../../src/routes/handlers/internal-handlers');
const { mockReq, mockRes } = require('sinon-express-mock');
const container = require('@n4l/container-utils');

describe('Internal Handlers Unit Tests', () => {
    determineVersionStub = null;

    beforeEach(async() => {
        determineVersionStub = sinon.stub(container, 'determineVersion');
        reset();
    });

    afterEach(async() => {
        sinon.restore();
    });

    after(async() => {});

    it('version should call successfully', async() => {
        const request = {};
        determineVersionStub.resolves({ major: 1, minor: 0, patch: 0 });
        const req = mockReq(request);
        const res = mockRes();
        await version(req, res);
        expect(res.status).to.be.calledWith(200);
    });
});