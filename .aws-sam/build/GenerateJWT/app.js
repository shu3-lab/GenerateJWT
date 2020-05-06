// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const jwt = require('jsonwebtoken')

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    const apiKey = process.env.API_KEY
    const secretKey = process.env.SECRET_KEY

    return this.generateJWT(apiKey, secretKey)
};

exports.generateJWT = function (apiKey, secretKey) {
    try {
        // const ret = await axios(url);
        expire = Math.floor(Date.now()) + (60000 * 15);
        const token = jwt.sign({
            iss: apiKey,
            exp: expire
        }, secretKey, {
            algorithm: 'HS256'
        });
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                jwt: token,
                generation: true
            })
        }
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify({
                jwt: null,
                generation: false
            })
        }
    }
    return response
};