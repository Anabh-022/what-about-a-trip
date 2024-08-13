import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { checkLogin } from '../../../../apps/frontend/lib/auth';
import { BACKEND_URL } from '../../../../apps/frontend/lib/config';
import Message from '../Messge';
import axios from "axios"

const ChatRoom = () => {
  const naviagte = useNavigate();
  const msgContainer = useRef();
  const mess = useRef();
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function init() {
      const loggedIn = await checkLogin();
      if (!loggedIn.status) {
        return naviagte("/register");
      }
      try {
        const { data: { messages } } = await axios.get(`${BACKEND_URL}/api/v1/messages`);
        setMessages(messages);
      }
      catch (e) {
        msgContainer.current.innerHTML = "Error While fetching messages";
      }
      const token = localStorage.getItem("token");
      console.log("ws init")
      const ws = new WebSocket(`ws://localhost:8080?tk=${token}`);
      localStorage.setItem("wsId", loggedIn.id);

      ws.onmessage = (message) => {
        console.log(message.data);
      }
      setSocket(ws);
      return () => {
        ws.close();
        localStorage.removeItem(wsId);
      }
    }
    init();
  }, [])

  console.log(messages)

  return (
    <>
      <div>ChatRoom</div>
      <div ref={msgContainer}>
        {messages.map((msg) => <Message key={msg.chatId} userName={msg.author.userName} message={msg.message} createdAt={msg.createdAt} />)}
      </div>
      <input type="text" ref={mess} name="" placeholder='Enter the message' />
      <button type="button" onClick={() => {
        const message = { userId: localStorage.getItem("wsId"), message: mess.current.value };
        socket.send(JSON.stringify(message));
        setMessages([...messages, {
          chatId: Math.random() * 999999, message: mess.current.value, "userID": localStorage.getItem("wsId"), createdAt: Date.now(), author: {
            userName: "You"
          }
        }])
      }}>Send</button>
    </>
  )
}

export default ChatRoom; 
