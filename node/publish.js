// node publish.js port $password

var rexec = require('remote-exec')

var connection_options = {
  port: process.argv[2],
  username: 'root',
  password: process.argv[3],
}

var hosts = ['intbird.net']

var cmds = [
  'ls -l',
  ''
]

rexec(hosts, cmds, connection_options, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Great Success!!')
  }
})
