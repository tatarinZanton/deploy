var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  dbUrl   : '"192.168.0.98"',
  dbUser  : '"root"',
  dbPasswd : '"adm/leg87"',
  dbName   : '"billing"',
  NODE_ENV: '"development"',
  pathToProg : '"/var/www/billing-system"'
})
