import express from "express";
import {WebSocketServer} from "ws";
import {authenticate} from "./lib/auth.js"

const app=express();
const httpServer=app.listen(8080,()=>{
    console.log(`${Date.now()} websocket server started at port 8080`);
});

const wss=new WebSocketServer({noServer:true});

httpServer.on("upgrade",async (request, socket, head)=>{
   const authed =await authenticate(request);
   if(!authed){
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return
   }

    wss.handleUpgrade(request, socket, head, connection => {
        wss.emit('connection', connection, request);
    })
})