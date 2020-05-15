const MongoClient = require('mongodb').MongoClient
const MongoConfigs = require('./key/mongodb-keys')


function insertOne(dbConnName, object, resultCallback, errorCallback) {
  console.log("insertOne", JSON.stringify(object))
  insertOneDB(MongoConfigs.dbUrl, MongoConfigs.dbName, dbConnName, object, resultCallback, errorCallback)
}

function insertArray(dbConnName, array, resultCallback, errorCallback) {
  console.log("insertArray", JSON.stringify(array))
  insertArrayBD(MongoConfigs.dbUrl, MongoConfigs.dbName, dbConnName, array, resultCallback, errorCallback)
}

function deleteOne(dbConnName, object, resultCallback, errorCallback) {
  console.log("deleteOne", JSON.stringify(object))
  deleteOneBD(MongoConfigs.dbUrl, MongoConfigs.dbName, dbConnName, object, resultCallback, errorCallback)
}

function deleteArray(dbConnName, array, resultCallback, errorCallback) {
  console.log("deleteArray", JSON.stringify(array))
  deleteArrayDB(MongoConfigs.dbUrl, MongoConfigs.dbName, dbConnName, array, resultCallback, errorCallback)
}

function queryOne(dbConnName, object, resultCallback, errorCallback) {
  console.log("queryOne", JSON.stringify(object))
  queryOneDB(MongoConfigs.dbUrl, MongoConfigs.dbName, dbConnName, object, resultCallback, errorCallback)
}

function queryArray(dbConnName, array, resultCallback, errorCallback) {
  console.log("queryArray", JSON.stringify(array))
  queryArrayDB(MongoConfigs.dbUrl, MongoConfigs.dbName, dbConnName, array, resultCallback, errorCallback)
}

function removeArray(dbConnName, resultCallback, errorCallback) {
  console.log("remove")
  queryArrayDB(MongoConfigs.dbUrl, MongoConfigs.dbName, dbConnName, {}, resultCallback, errorCallback)
}


function insertOneDB(dbUrl, dbName, dbConnName, object, resultCallback, errorCallback) {
  const options = {useNewUrlParser: true, useUnifiedTopology: true}
  MongoClient.connect(dbUrl, options, function (err, client) {
    if (err) {
      errorCallback(err);
      return
    }

    const db = client.db(dbName);
    db.collection(dbConnName).insertOne(object, function (error, result) {
      if (err) {
        errorCallback(err);
        return
      }
      resultCallback(result);
      console.log("result:", JSON.stringify(result))
      client.close();
    });
  });
}


function insertArrayBD(dbUrl, dbName, dbConnName, array, resultCallback, errorCallback) {
  const options = {useNewUrlParser: true, useUnifiedTopology: true}
  MongoClient.connect(dbUrl, options, function (err, client) {
    if (err) {
      errorCallback(err);
      return
    }

    const db = client.db(dbName);
    db.collection(dbConnName).insertMany(array, function (error, result) {
      if (err) {
        errorCallback(err);
        return
      }
      resultCallback(result);
      console.log("result:", JSON.stringify(result))
      client.close();
    });
  });
}

function deleteOneBD(dbUrl, dbName, dbConnName, object, resultCallback, errorCallback) {
  const options = {useNewUrlParser: true, useUnifiedTopology: true}
  MongoClient.connect(dbUrl, options, function (err, client) {
    if (err) {
      errorCallback(err);
      return
    }

    const db = client.db(dbName);
    db.collection(dbConnName).deleteOne(object, function (error, result) {
      if (error) throw error;
      resultCallback(result);
      console.log("result:", JSON.stringify(result))
      client.close();
    });
  })

}

function deleteArrayDB(dbUrl, dbName, dbConnName, array, resultCallback, errorCallback) {
  const options = {useNewUrlParser: true, useUnifiedTopology: true}
  MongoClient.connect(dbUrl, options, function (err, client) {
    if (err) {
      errorCallback(err);
      return
    }

    const db = client.db(dbName);
    db.collection(dbConnName).deleteMany(array, function (error, result) {
      if (error) throw error;
      resultCallback(result);
      console.log("result:", JSON.stringify(result))
      client.close();
    });
  })
}

function queryOneDB(dbUrl, dbName, dbConnName, object, resultCallback, errorCallback) {
  const options = {useNewUrlParser: true, useUnifiedTopology: true}
  MongoClient.connect(dbUrl, options, function (err, client) {
    if (err) {
      errorCallback(err);
      return
    }
    const db = client.db(dbName);
    db.collection(dbConnName).findOne(object, function (error, result) {
      if (error) throw error;
      resultCallback(result);
      console.log("result:", JSON.stringify(result))
      client.close();
    });
  })
}

function queryArrayDB(dbUrl, dbName, dbConnName, object, resultCallback, errorCallback) {
  const options = {useNewUrlParser: true, useUnifiedTopology: true}
  MongoClient.connect(dbUrl, options, function (err, client) {
    if (err) {
      errorCallback(err);
      return
    }

    const db = client.db(dbName);
    db.collection(dbConnName).find(object).toArray(function (error, result) {
      if (error) throw error;
      resultCallback(result);
      console.log("result:", JSON.stringify(result))
      client.close();
    });
  })
}

module.exports = {
  MongoClient: MongoClient,
  queryOne,
  queryArray,
  insertOne,
  insertArray,
  deleteOne,
  deleteArray
}
