import React, { useEffect, useRef } from 'react';
import { Avatar, Tooltip, Image } from '@chakra-ui/react';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../congif/ChatLogics';
import { ChatState } from '../../context/chatprovider';

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
                            background: m.sender._id === user._id ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" : "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                            color: m.sender._id === user._id ? "white" : "black",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            borderRadius: "20px",
                            padding: "8px 16px",
                            maxWidth: "75%",
                            fontFamily: "'Inter', sans-serif"
                        }}
                    >
                        {m.messageType === "image" ? (
                            <Image src={m.content} alt="image message" maxWidth="250px" borderRadius="10px" />
                        ) : m.messageType === "video" ? (
                            <video src={m.content} controls width="250" style={{ borderRadius: "10px" }} />
                        ) : (
                            m.content
                        )}
                    </span>
                </div>
            ))}
            {/* Invisible div to scroll to bottom */}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ScrollableChat;
