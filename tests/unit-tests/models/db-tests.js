const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('@n4l/sinon-mongoose');
const mongoose = require('mongoose');
const db = require('../../../src/models/db');

async function assertThrowsAsync(fn, message) {
    let f = () => {};
    try {
        await fn();
    } catch (e) {
        f = () => { throw e; };
    } finally {
        assert.throws(f, Error, message);
    }
}

describe('DB Unit Tests', () => {
    mongooseConnectStub = null;

    beforeEach(async() => {
        mongooseConnectStub = sinon.stub(mongoose, 'connect');
    });

    afterEach(async() => {
        sinon.restore();
    });

    it('db should call successfully', async() => {
        await db({
            maxRetry: 1,
            username: 'test',
            pass: 'start',
            opts: '?xyz'
        }, 1);
        expect(mongooseConnectStub.calledOnce).to.be.true;
    });

    it('db should handle error', async() => {
        mongooseConnectStub.throws(new Error('some error'));

        await assertThrowsAsync(async () => {
            await db({
                maxRetry: 1
            }, 1);
        }, 'some error');
    });
});