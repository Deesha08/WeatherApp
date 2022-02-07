const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


const client = new AWS.DynamoDB.DocumentClient();




module.exports = {
    postInDatabase: (params) => {
        client.put(params, (err, data) => {
            if (err) {
                console.error("Unable to add item.", err);
                return err
            } else {
                console.log("Added item:");
                return data
            }
        });
    }
}