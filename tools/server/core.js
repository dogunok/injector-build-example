const WebSocket = require('ws')
const chalk = require('chalk')
const date = require('date-and-time')

const clients = {}
const needHandler = {
  gulp: true,
  browser: true
}

const getMessage = (action, client) => {
  const time = date.format(new Date(), 'HH:mm:ss')
  return `[${chalk.gray(time)}] ${action} ${chalk.green(client)}`
}

const webSocketServer = new WebSocket.Server({ port: 9999 })

webSocketServer.on('connection', ws => {

  const client = clients.gulp ? 'browser' : 'gulp'
  clients[client] = ws
  console.log(getMessage('Connected', client))

  ws.on('close', () => {
    delete clients[client]
    console.log(getMessage('Disconnected', client))
  })

  if (needHandler.gulp && clients.gulp) {
    needHandler.gulp = false
    clients.gulp.on('message', message => {
      // console.log(getMessage('Received message from', client), `: ${message}`)
      clients.browser && clients.browser.send(message)
    })
  }
})
