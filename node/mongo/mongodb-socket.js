const mongodbManager = require("./mongodb")
const MongoConfigs = require('./key/mongodb-keys')

function insert(obj, resultCallback, errorCallback) {
  mongodbManager.insertOne(MongoConfigs.connSocket, obj, resultCallback, errorCallback)
}

function query(obj, resultCallback, errorCallback) {
  mongodbManager.queryArray(MongoConfigs.connSocket, obj, resultCallback, errorCallback)
}

function deleted(justOne, obj, resultCallback, errorCallback) {
  if (justOne) {
    mongodbManager.deleteOne(MongoConfigs.connSocket, obj, resultCallback, errorCallback)
  } else {
    mongodbManager.deleteArray(MongoConfigs.connSocket, obj, resultCallback, errorCallback)
  }
}

exports.insert = insert
exports.query = query
exports.delete = deleted
