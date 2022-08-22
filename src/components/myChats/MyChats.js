import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import Menu from '../miscellaneous/menuSelector/Menu'
import Contacts from './extra/Contacts'
import SearchChat from './extra/SearchChat'
import AllUser from './extra/AllUser'
import Notification from './extra/Notification'
import CreateGroupChat from './extra/CreateGroupChat'
import { useNavigate } from 'react-router-dom'

const MyChats = ({ fetchAgain }) => {
    const navigate = useNavigate();
    const { selectedChat, selectedMenuItem } = ChatState();

    const handleLogout = () => {
        localStorage.removeItem("chat-app-user");
        navigate("/login");
    }
    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="3px"
            overflow={'hidden'}
        >
            {selectedMenuItem === 1 && <Contacts fetchAgain={fetchAgain} handleLogout={handleLogout}/>}
            {selectedMenuItem === 2 && <SearchChat />}
            {selectedMenuItem === 3 && <AllUser />}
            {selectedMenuItem === 4 && <CreateGroupChat />}
            {selectedMenuItem === 5 && <Notification />}
            <Box
                marginTop={2}
                backgroundColor="#38B2AC"
                width='100%'
            >
                <Menu />
                <div style={{ width: "100%", height: '5px' }}></div>
            </Box>
        </Box>
    )
}

export default MyChats
