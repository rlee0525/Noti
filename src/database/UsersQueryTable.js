var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for user with id of 1");

var params = {
    TableName : "noti",
    KeyConditionExpression: "#id = :n",
    ExpressionAttributeNames:{
        "#id": "id"
    },
    ExpressionAttributeValues: {
        ":n": 1
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.id + ": " + item.name);
        });
    }
});