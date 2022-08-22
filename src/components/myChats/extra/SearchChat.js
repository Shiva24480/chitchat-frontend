import React, { useState } from 'react'
import { Box, Input, Button, Spinner } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatState } from '../../../context/ChatProvider';
import axios from 'axios';
import ChatLoading from '../../miscellaneous/loading/ChatLoading'
import UserListItem from '../../miscellaneous/UserListItem';

const SearchChat = () => {
  const { user, chats, setChats, setSelectedChat, setSelectedMenuItem } = ChatState();

  const [search, setSearch] = useState("");
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

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter something in Search", toastStyle);
      return;
    }
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
  }

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
        fontSize={{ base: "20px", md: "15px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Input
          placeholder='Search by Name or Email'
          marginRight={2}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          outline='2px solid gray'
        ></Input>
        <Button colorScheme='teal' onClick={handleSearch}>
          <SearchIcon />
        </Button>
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
          <ChatLoading />
        ) : (
          <>
            {loadingChat && <Spinner ml='auto' d='flex' />}
            {
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            }
          </>
        )}
      </Box>
    </>
  )
}

export default SearchChat