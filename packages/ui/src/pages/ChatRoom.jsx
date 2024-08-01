import React, { useEffect, useRef, useState } from 'react'

const ChatRoom = () => {
  console.log("chatroom hi")
  const mess = useRef();
  const [socket, setSocket] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const ws = new WebSocket(`ws://localhost:8080?tk=${token}`);
    ws.onopen = () => {
      //ws.send("init message")
    }
    ws.onmessage = (message) => {
      console.log(message.data);
    }
    setSocket(ws);
    return () => {
      ws.close();
    }
  }, [])
  return (
    <>
      <div>ChatRoom</div>
      <input type="text" ref={mess} name="" placeholder='Enter the message' />
      <button type="button" onClick={() => {
        socket.send(`${mess.current.value}`);
      }}>Send</button>
    </>
  )
}

export default ChatRoom; 
