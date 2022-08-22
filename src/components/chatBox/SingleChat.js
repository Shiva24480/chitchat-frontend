import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, FormControl, IconButton, Text, Spinner, Input, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getSender } from '../../config/chatLogics'
import { ChatState } from '../../context/ChatProvider'
import UGCmodal from '../UGCmodal'
import ScrollableChat from "./ScrollableChat";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import io from 'socket.io-client'
import loadingImage from '../../images/loading.gif'
import imojilogo from '../../images/WinkEmoji.png'
import Picker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
var ENDPOINT = process.env.REACT_APP_END_POINT;
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [socketConnected, setSocketConnected] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  //1111
  const handleEmojiPickerhideShow = () => {
    // console.log("hello");
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let newMsg = newMessage;
    newMsg += emojiObject.emoji;
    setNewMessage(newMsg);
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", setSocketConnected(true));
  }, [])

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_END_POINT}/api/message/${selectedChat._id}`,
        config
      );
      // console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error Occured!", toastStyle);
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      await send();
    };
  }

  const handleSendClick = async () => {
    await send();
  }

  const send = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        `${process.env.REACT_APP_END_POINT}/api/message`,
        {
          content: newMessage,
          chatId: selectedChat,
        },
        config
      );
      socket.emit("new message", data);
      // console.log(data);
      setMessages([...messages, data]);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error("Error Occured!", toastStyle);
    }
  }


  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  })

  // console.log(notification);

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  return (
    <>
      {
        selectedChat ?
          (<>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w="100%"
              fontFamily="Work sans"
              display="flex"
              justifyContent={{ base: "space-between" }}
              alignItems="center"
            >
              <IconButton
                display={{ base: "flex", md: "none" }}
                _hover={{ bg: 'gray' }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              {
                !selectedChat.isGroupChat ? (
                  <>
                    {getSender(user, selectedChat.users)}
                  </>
                ) : (
                  <>
                    {selectedChat.chatName.toUpperCase()}
                    {
                      <UGCmodal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}
                        fetchMessages={fetchMessages}
                      />
                    }
                  </>
                )
              }
            </Text>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#E8E8E8"
              w="100%"
              h="100%"
              borderRadius="lg"
              overflowY="hidden"
            >
              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                <div className="messages" style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                  <ScrollableChat messages={messages} user={user} />
                </div>
              )}

              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt={3}
              >
                <Box display={"flex"}>
                  <div className="emoji" onClick={handleEmojiPickerhideShow}>
                    <img className='emoji-picker-image' src={imojilogo} alt="" />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                  </div>
                  <Input
                    variant="filled"
                    bg="#E0E0E0"
                    placeholder="Enter a message.."
                    value={newMessage}
                    onChange={typingHandler}
                    marginLeft='0.3rem'
                    marginRight='-2rem'
                  />
                  <Button colorScheme='teal' size='md' borderRadius='2rem' padding='0rem 1.2rem' onClick={handleSendClick}>
                    <SendIcon />
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </>) :
          (<Box display="flex" flexDirection={'column'} alignItems="center" justifyContent="center" h="100%">
            <img className='loadingImage' src={loadingImage} alt="" />
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
              Click on a user to start chatting
            </Text>
          </Box>)
      }
    </>
  )
}

export default SingleChat