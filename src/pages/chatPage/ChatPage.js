import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Box } from "@chakra-ui/react";
import MyChats from '../../components/myChats/MyChats';
import ChatBox from '../../components/chatBox/ChatBox';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
    const navigate = useNavigate();
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login")
        }
    }, [])
    
    return (
        <Box display="flex" justifyContent="space-between" w="100%" h="100vh" p="10px">
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
    )
}

export default ChatPage
