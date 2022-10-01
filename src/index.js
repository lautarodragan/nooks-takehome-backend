import express from 'express'
// import bodyParser from 'body-parser'
// import cors from 'cors'
import WebSocket, { WebSocketServer } from 'ws'

const app = express()
const port = 3000

// app.use(bodyParser.json())
// app.use(cors())
//
// const server = app.listen(port, () => {
//   console.log(`Youtube Watch Party listening at port ${port}`)
// })

const webSocketServer = new WebSocketServer({ port: 8080 })

webSocketServer.on('connection', function (client) {
  console.log('WebSocket Client Connected')

  client.on('message', (message, isBinary) => {
    console.log('WebSocket Server Received message.', message.toString())

    webSocketServer.clients.forEach(secondClient => {
      if (client === secondClient)
        return
      console.log('sending to client', secondClient.readyState, WebSocket.OPEN)
      if (secondClient.readyState === WebSocket.OPEN) {
        secondClient.send(message, { binary: isBinary })
      }
    })
  })

})
