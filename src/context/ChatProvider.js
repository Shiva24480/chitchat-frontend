import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(1);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("chat-app-user"))
    setUser(userInfo);
  }, [navigate])

  return (
    <chatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, selectedMenuItem, setSelectedMenuItem, notification, setNotification }}>
      {children}
    </chatContext.Provider>
  )
}

export const ChatState = () => {
  return useContext(chatContext);
}

export default ChatProvider
