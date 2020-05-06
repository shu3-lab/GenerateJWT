'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        // expect(response.message).to.be.equal("hello world");
        // expect(response.location).to.be.an("string");
    });

    it('verifies successful jwt', async () => {
        const result = app.generateJWT(process.env.API_KEY, process.env.SECRET_KEY)

        expect(result.statusCode).to.equal(200);
        
        let response = JSON.parse(result.body);

        expect(response.generation).to.be.an('boolean')
        expect(response.generation).to.be.equal(true)
    });
    
    it('verifies failure jwt', async () => {
        const result = app.generateJWT(null, null)

        expect(result.statusCode).to.equal(500);
        
        let response = JSON.parse(result.body);

        expect(response.generation).to.be.an('boolean')
        expect(response.generation).to.be.equal(false)
    });
});