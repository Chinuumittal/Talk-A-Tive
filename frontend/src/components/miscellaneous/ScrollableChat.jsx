import React from 'react';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../congif/ChatLogics';
import { ChatState } from '../../context/chatprovider';

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <div style={{ overflowX: "hidden", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {messages && messages.map((m, i) => (
                <div style={{ display: "flex", marginTop: isSameUser(messages, m, i) ? 3 : 10 }} key={m._id}>
                    {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
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
                            backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                        }}
                    >
                        {m.content}
                    </span>
                </div>
            ))}
            {/* Invisible div to scroll to bottom, if implemented */}
        </div>
    );
};

export default ScrollableChat;
