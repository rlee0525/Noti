let AWS = require('aws-sdk');

AWS.config.update({
  region: 'use-west-2',
  endpoint: "http://localhost:8000"
});

let docClient = new AWS.DynamoDB.DocumentClient();

const table = "noti";

export const deleteUser = id => {
  var params = {
    TableName:table,
    Key:{
        "id":id,
    }
  };

  console.log('Deleting an user');
  docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};

export const addUser = user => {
  let params = {
    TableName: table,
    Item: {
      "id": user.id,
      "name": user.name,
      "email": user.email,
      "password_digest": user.password_digest,
      "settings": user.settings
    }
  };

  console.log("Adding a new user...");
  docClient.put(params, function(err, data) {
      if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
      }
  });
};

export const getUser = id => {
  let params = {
    TableName: table,
    Key: {
      "id": id
    }
  };

  console.log('Getting user with id of ', id);
  docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};

export const updateUser = user => {
  let params = {
    TableName: table,
    Key: {
      "id": user.id,
    },
    UpdateExpression: "set name = :n, email = :e, password_digest = :p, settings = :s",
    ExpressionAttributeValues: {
      ":n": user.name,
      ":e": user.email,
      ":s": user.settings
    }
  };
};