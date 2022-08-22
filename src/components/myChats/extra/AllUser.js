import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../../../context/ChatProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import UserListItem from '../../miscellaneous/UserListItem';

const AllUser = () => {
  const { user, chats, setChats, setSelectedChat, setSelectedMenuItem } = ChatState();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const accessChat = async (userId) => {
    // console.log(userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${process.env.REACT_APP_END_POINT}/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log(data);
      setSelectedChat(data);
      setLoadingChat(false);
      setSelectedMenuItem(1);
    } catch (error) {
      toast.error("Error fetching the chat", toastStyle);
      return;
    }
  };

  const handleSearch = async (search) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${process.env.REACT_APP_END_POINT}/api/users?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
      return
    } catch (error) {
      toast.error("Not found", toastStyle);
      return
    }
  };

  useEffect(() => {
    handleSearch("");
  }, []);


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
        Suggestions
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
        {loading ? (
          // <ChatLoading />
          <div>Loading...</div>
        ) : (
          searchResult
            ?.slice(0, 20)
            .map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
        )}
      </Box>
    </>
  )
}

export default AllUser
