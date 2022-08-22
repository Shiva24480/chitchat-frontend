import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}

export async function createGroupApi(groupName, selectedUser, token, onClose, handleChats, chats) {
    if (!groupName || !selectedUser) {
        toast.error("Please fill Group name and Add user", toastStyle);
        return;
    }

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
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
        console.log(data);
        handleChats([data, ...chats]);
        onClose();
        toast.success("New group has been created", toastStyle);
        return 1;
    } catch (error) {
        toast.error("Failed to create chat", toastStyle);
        return 0;
    }

}


export async function renameGroupApi(groupChatName, token, Id, handleSelectedChat, setFetchAgain, fetchAgain, setGroupChatName ) {
    if (!groupChatName) return;

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(
            `${process.env.REACT_APP_END_POINT}/api/chat/rename`,
            {
                chatId: Id,
                chatName: groupChatName,
            },
            config
        );

        handleSelectedChat(data);
        setFetchAgain(!fetchAgain);
        return true;
    } catch (error) {
        toast.error("Error Occured!",toastStyle);
        setGroupChatName("");
        return false;
    }
}