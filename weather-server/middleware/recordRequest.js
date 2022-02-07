const { v4: uuidv4 } = require('uuid');
const config = require('../config')
const { postInDatabase } = require('../utils')

module.exports = recordRequest = async(req, res, next) => {
    console.debug(req)
    var params = {
        TableName: config.dynamoDB.requestsTrackerTable,
        Item: {
            "id": uuidv4(),
            "method": req.method,
            "requestUrl": req.url,
            "httpVersion": req.httpVersion,
            "headers": req.headers

        }
    }
    try {
        const response = await postInDatabase(params)
        next();
    } catch (error) {
        console.error(error);
        next();
    }



};