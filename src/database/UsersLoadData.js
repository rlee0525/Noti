let AWS = require('aws-sdk');
let fs = require('fs');

AWS.config.update({
  region: 'us-west-2',
  endpoint: "http://localhost:8000"
});

let docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing users into DynamoDB. Please Wait');

let allUsers = [
  { "id": 1, "name": 'Raymond Lee1' },
  { "id": 2, "name": 'Raymond Lee2' },
  { "id": 3, "name": 'Raymond Lee3' },
  { "id": 4, "name": 'Raymond Lee4' },
];

allUsers.forEach( user => {
  let params = {
    TableName: 'noti',
    Item: {
      "id": user.id,
      "name": user.name
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add user ', user.name, '. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log("PutItem succeeded:", user.name);
    }
  });
});