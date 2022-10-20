const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const pjson = require('../../../package.json');
const { getVersionParts } = require('@n4l/string-utils');

describe('Internal Routes Controller Integration Tests', () => {
    let server;

    beforeEach(() => {
        server = require('../../../app');
    });

    afterEach(() => {
        server.close();
    });

    it('responds to /version', async () => {
        const version = getVersionParts(pjson.version || '0.0.0');
        const result = await request(server).get('/version');
        expect(result.statusCode).to.eq(200);
        expect(result.body.major).to.eq(version.major);
        expect(result.body.minor).to.eq(version.minor);
        expect(result.body.patch).to.eq(version.patch);
    });

    it('404 everything else', async () => {
        const result = await request(server).get('/foo/bar');
        expect(result.statusCode).to.eq(404);
    });
});
