/* eslint-env mocha */

const request = require('supertest');
const chai = require('chai');
const app = require('../index');

const expect = chai.expect;

chai.config.includeStack = true;

describe('## Misc', () => {
    describe('# GET /', () => {
        it('Should return hello', (done) => {
            request(app)
                .get('/')
                .expect('hello')
                .then((res) => {
                    expect(res.text).to.equal('hello');
                    done();
                })
                .catch(done);
        });
    });
});
