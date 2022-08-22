import { Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import {  isLastMessage, isSameSender, isSameSenderMargin } from '../../config/chatLogics'

function ScrollableChat({ messages, user }) {

    return (
        <ScrollableFeed>
            {
                messages && messages.map((m, i) => (
                    <div
                        style={{
                            display: 'flex',
                            width: '100%'
                        }} key={m._id}
                    >
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user?._id ? "#BEE3F8" : "#B9F5D0"}`,
                                borderRadius: '20px',
                                padding: '5px 15px',
                                maxWidth: "75%",
                                color: 'black',
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: "5px"
                            }}
                        >
                            {m.content}
                        </span>
                    </div>
                ))
            }
        </ScrollableFeed>
    )
}

export default ScrollableChat