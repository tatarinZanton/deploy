var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  dbUrl   : '"192.168.0.60"',
  dbUser  : '"root"',
  dbPasswd : '"adm/leg87"',
  dbName   : '"billing"',
  NODE_ENV: '"testing"'
})
