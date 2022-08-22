import React from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../../../context/ChatProvider'
import { getSender } from '../../../config/chatLogics';

const Notification = () => {
  const { user, notification, setNotification,setSelectedChat } = ChatState();

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
        Notifications
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
        {!notification.length && <h1>No new message</h1>}
        {notification.map((notif) => (
          <div className='notification'
            key={notif._id}
            onClick={() => {
              setSelectedChat(notif.chat);
              setNotification(notification.filter((n) => n !== notif));
            }}
          >
            {notif.chat.isGroupChat
              ? `New Message in ${notif.chat.chatName}`
              : `New Message from ${getSender(user, notif.chat.users)}`}
          </div>
        ))}
      </Box>
    </>
  )
}

export default Notification
