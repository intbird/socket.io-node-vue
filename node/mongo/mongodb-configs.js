const mongodbManager = require('./mongodb')
const MongoConfigs = require('./key/mongodb-keys')

function insertVisitor (obj, resultCallback, errorCallback) {
  mongodbManager.insertOne(MongoConfigs.connVisitor, obj, resultCallback, errorCallback)
}

function queryWorkbenchConfigs (object, resultCallback, errorCallback) {
  mongodbManager.queryArray(MongoConfigs.connWorkbench, object, resultCallback, errorCallback)
}

function queryKnowledge (object, resultCallback, errorCallback) {
  mongodbManager.queryArray(MongoConfigs.knowledge, object, resultCallback, errorCallback)
}

function queryOpenSourceConfigs (object, resultCallback, errorCallback) {
  mongodbManager.queryArray(MongoConfigs.openSource, object, resultCallback, errorCallback)
}

function querySimpleCode (object, resultCallback, errorCallback) {
  mongodbManager.queryArray(MongoConfigs.simpleCode, object, resultCallback, errorCallback)
}

exports.insertVisitor = insertVisitor

exports.queryWorkbenchConfigs = queryWorkbenchConfigs
exports.queryKnowledge = queryKnowledge
exports.queryOpenSourceConfigs = queryOpenSourceConfigs
exports.querySimpleCode = querySimpleCode
