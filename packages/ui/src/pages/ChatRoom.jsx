import React, { useEffect, useRef, useState } from 'react'

const ChatRoom = () => {
  console.log("chatroom hi")
  const mess = useRef();
  const [socket, setSocket] = useState();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080?tk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyNzU5YzE1LWVlZTgtNGVlYy05ODZiLWE5Yjc0NjdmOWRkNiIsImlhdCI6MTcyMTI4OTI2NH0.-SIAr_OivudPFomY9O3CvVBUmr37ZTtkxAlU0q8q_K4");
    ws.onopen = () => {
      ws.send("init message")
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
