import React from 'react'
import './Menu.css'
import MessageIcon from '@mui/icons-material/Message';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ChatState } from '../../../context/ChatProvider';
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge";

function Menu() {
    const { selectedMenuItem, setSelectedMenuItem, notification } = ChatState();

    const handleClick = (num) => {
        setSelectedMenuItem(num);
    }

    return (
        <div className="menu-container">
            <ul className='menu-ulist'>
                <li onClick={() => handleClick(1)} className={selectedMenuItem === 1 ? "active" : ""}>
                    <span className='menu-icon'>
                        <MessageIcon />
                    </span>
                </li>
                <li onClick={() => handleClick(2)} className={selectedMenuItem === 2 ? "active" : ""}>
                    <span className='menu-icon'>
                        <SearchIcon />
                    </span>
                </li>
                <li onClick={() => handleClick(3)} className={selectedMenuItem === 3 ? "active" : ""}>
                    <span className='menu-icon'>
                        <PersonAddIcon />
                    </span>
                </li>
                <li onClick={() => handleClick(4)} className={selectedMenuItem === 4 ? "active" : ""}>
                    <span className='menu-icon'>
                        <GroupAddIcon />
                    </span>
                </li>
                <li onClick={() => handleClick(5)} className={selectedMenuItem === 5 ? "active" : ""}>
                    <span className='menu-icon'>
                        <NotificationsIcon />
                        <div style={{marginTop:'-2rem'}}>
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                        </div>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Menu
