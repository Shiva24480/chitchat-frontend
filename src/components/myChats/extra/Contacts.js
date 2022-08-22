import React, { useEffect, useState } from 'react'
import { Box, Stack, Text, Menu, MenuButton, MenuList, MenuItem, Button, MenuDivider } from '@chakra-ui/react'
import { ChatState } from '../../../context/ChatProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import ChatLoading from '../../miscellaneous/loading/ChatLoading';
import { getSender } from '../../../config/chatLogics'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProfileModal from '../../profileModal/ProfileModal';

const Contacts = ({ fetchAgain, handleLogout }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats, notification } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${process.env.REACT_APP_END_POINT}/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast("Error Occured!", toastStyle);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain, notification]);

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }
  return (
    <>
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Contacts
        <Menu>
          <MenuButton as={Button}>
            <MoreVertIcon />
          </MenuButton>
          <MenuList fontSize='0.8rem' borderWidth='2px'>
            <MenuItem>
              <ProfileModal handleLogout={handleLogout} user={user} />
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="79%"
        borderRadius="lg"
        overflowY="hidden"
        border={'1px solid black'}
      >
        {
          chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(user, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )
        }
      </Box>
    </>
  )
}

export default Contacts