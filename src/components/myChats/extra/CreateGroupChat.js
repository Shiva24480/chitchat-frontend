import React, { useState } from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import './style.css'
import { ChatState } from '../../../context/ChatProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserListItem from '../../miscellaneous/UserListItem';
import UserBadgeItem from '../../miscellaneous/UserBadgeItem';

const CreateGroupChat = () => {
  const { user, chats, setChats, setSelectedMenuItem } = ChatState();

  const [groupName, setGroupName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!groupName || !selectedUser) {
      toast.error("Please fill all the feilds", toastStyle);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_END_POINT}/api/chat/group`,
        {
          name: groupName,
          users: JSON.stringify(selectedUser.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setSelectedMenuItem(1);
      toast.success("New Group Chat Created!", toastStyle);
    } catch (error) {
      toast.error("Failed to Create the Chat!", toastStyle);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResult([]);
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
      const { data } = await axios.get(`${process.env.REACT_APP_END_POINT}/api/users?search=${query}`, config);
      setSearchResult(data);
      setLoading(false);
      return
    } catch (error) {
      toast.error("Not found", toastStyle);
      return
    }
  }

  // add to the user in list of group
  const handleGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      toast.error("User already added", toastStyle);
      return;
    }

    setSelectedUser([...selectedUser, userToAdd]);
  }

  // delete the selected user
  const handleDelete = (delUser) => {
    setSelectedUser(selectedUser.filter((sel) => sel._id !== delUser._id));
  };

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
        Create Group
        <Button colorScheme='blue' mr={3}
          onClick={handleSubmit}
        >
          Submit
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
        overflowY="scroll"
        border={'1px solid black'}
      >
        <Input
          isInvalid
          errorBorderColor='#38b2ac'
          placeholder='Enter Group Name'
          marginBottom={2}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Input
          isInvalid
          errorBorderColor='#38b2ac'
          placeholder='Add Users eg: guest, test'
          onChange={(e) => handleSearch(e.target.value)}
          marginBottom={2}
        />

        {/* show added user and to remove them */}
        <Box w="100%" display="flex" flexWrap="wrap" >
          {selectedUser.map((u) => (
            <UserBadgeItem
              key={u._id}
              user={u}
              handleFunction={() => handleDelete(u)}
            />
          ))}
        </Box>

        {loading ? (
          // <ChatLoading />
          <div>Loading...</div>
        ) : (
          searchResult
            ?.slice(0, 4)
            .map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
              />
            ))
        )}
      </Box>
    </>
  )
}

export default CreateGroupChat