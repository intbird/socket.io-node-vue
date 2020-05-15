const apiKeys = require('./keys/api-keys')
const mongoConfig = require('../mongo/mongodb-configs.js')
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(express.static(path.resolve(__dirname, '../../dist')))
app.get(apiKeys.root, function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8')
  res.send(html)
})

app.get(apiKeys.visitor, function (req, res) {
  const app_from = req.params && req.params.from ? req.params.from : "none"
  const ip_from = req.ip ? req.ip : "none"
  const result = {insertVisitor: '1', ip_from, app_from}
  mongoConfig.insertVisitor(result, () => {
  }, () => {
  })
  res.send(result)
})

const trackFlowResult = []
app.get(apiKeys.trackflow, function (req, res) {
  res.send(trackFlowResult)
})

function trackFlow(result) {
  trackFlowResult.push(result)
}

app.get(apiKeys.workbenchConfigs, function (req, res) {
  const result = {}
  mongoConfig.queryWorkbenchConfigs(result, result => {
    res.send(result)
  }, () => {
    res.send({})
  })
})

app.get(apiKeys.knowledge, function (req, res) {
  const result = {}
  mongoConfig.queryKnowledge(result, result => {
    res.send(result)
  }, () => {
    res.send({})
  })
})

app.get(apiKeys.openSourceProject, function (req, res) {
  const result = {}
  mongoConfig.queryOpenSourceConfigs(result, result => {
    res.send(result)
  }, () => {
    res.send({})
  })
})

app.get(apiKeys.simpleCodes, function (req, res) {
  const result = {}
  mongoConfig.querySimpleCode(result, result => {
    res.send(result)
  }, () => {
    res.send({})
  })
})

exports.express = express
exports.app = app
exports.fs = fs
exports.trackFlow = trackFlow
