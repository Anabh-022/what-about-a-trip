import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { authenticate } from "./lib/auth.js"
import { UserManager } from "./managers/userManager.js";
import { db } from "@repo/database/client"

const app = express();
const userManager = new UserManager();
const httpServer = app.listen(8080, () => {
  console.log(`${Date.now()} websocket server started at port 8080`);
});

const wss = new WebSocketServer({ noServer: true });

httpServer.on("upgrade", async (request, socket, head) => {
  const authed = await authenticate(request);
  if (!authed.success) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
    socket.destroy()
    return
  }
  console.log(`new user connected ${Date.now()}`)
  wss.handleUpgrade(request, socket, head, connection => {
    wss.emit('connection', connection, request);
  })
  wss.on("connection", (ws) => {
    console.log("inside connection");
    userManager.addUser(authed.user.id, ws);
    ws.on("message", async (data, isBinary) => {
      //console.log(data);
      const payload = JSON.parse(data);
      console.log(typeof (payload));
      db.chatRoom.create({
        data: {
          message: data,
          userId: payload.userId
        }
      })

      userManager.brodcast(payload.userId, payload.message, isBinary);
    })
  })

})
