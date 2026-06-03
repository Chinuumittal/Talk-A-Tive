import React, { useState, useEffect } from 'react';
import { Box, Text, IconButton, Spinner, FormControl, Input, useToast, Avatar, AvatarBadge } from '@chakra-ui/react';
import { ArrowBackIcon, AttachmentIcon } from '@chakra-ui/icons';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChatState } from '../../context/chatprovider';
import { getSender, getSenderFull } from '../../congif/ChatLogics';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';

let selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);
  const toast = useToast();

  const { user, selectedChat, setSelectedChat, notification, setNotification, socket, onlineUsers } = ChatState();

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
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);

      if (socket) {
        socket.emit("join chat", selectedChat._id);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      if (socket) {
        socket.emit("stop typing", selectedChat._id);
      }
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const messageToSend = newMessage;
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: messageToSend,
            chatId: selectedChat._id,
          },
          config
        );

        if (socket) {
          socket.emit("new message", data);
        }
        setMessages([...messages, data]);
        setFetchAgain(!fetchAgain);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const postMedia = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast({
        title: "Please select an image or video file",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setMediaLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dwr8c1dkd");

    const endpoint = file.type.startsWith("video/") 
        ? "https://api.cloudinary.com/v1_1/dwr8c1dkd/video/upload"
        : "https://api.cloudinary.com/v1_1/dwr8c1dkd/image/upload";

    fetch(endpoint, {
      method: "post",
      body: data,
    })
    .then((res) => res.json())
    .then(async (data) => {
      const mediaUrl = data.secure_url || data.url;
      const messageType = file.type.startsWith("video/") ? "video" : "image";
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const resData = await axios.post(
          "/api/message",
          {
            content: mediaUrl,
            chatId: selectedChat._id,
            messageType: messageType,
          },
          config
        );

        if (socket) {
          socket.emit("new message", resData.data);
        }
        setMessages((prevMessages) => [...prevMessages, resData.data]);
        setFetchAgain(!fetchAgain);
        setMediaLoading(false);
      } catch (error) {
        toast({ title: "Failed to send media", status: "error", duration: 5000, isClosable: true, position: "bottom" });
        setMediaLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setMediaLoading(false);
      toast({ title: "Error uploading media", status: "error", duration: 5000, isClosable: true, position: "bottom" });
    });
  };

  useEffect(() => {
    if (!socket) return;

    if (socket.connected) {
      setSocketConnected(true);
    }

    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.off("connected");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [socket]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    const handleMessageRecieved = (newMessageRecieved) => {
      if (
        !selectedChatCompare || 
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    };

    if (socket) {
      socket.on("message recieved", handleMessageRecieved);
    }

    return () => {
      if (socket) {
        socket.off("message recieved", handleMessageRecieved);
      }
    };
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // Typing Indicator Logic
    if (!socketConnected || !socket) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        if (socket) {
          socket.emit("stop typing", selectedChat._id);
        }
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box
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
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                <Box display="flex" alignItems="center" gap={3}>
                  <Avatar
                    size="sm"
                    name={getSenderFull(user, selectedChat.users)?.name}
                    src={getSenderFull(user, selectedChat.users)?.pic}
                    cursor="pointer"
                  >
                    {onlineUsers && onlineUsers.includes(getSenderFull(user, selectedChat.users)?._id) && (
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    )}
                  </Avatar>
                  <Box>
                    <Text fontSize={{ base: "20px", md: "24px" }} fontWeight="bold" lineHeight="normal">
                      {getSender(user, selectedChat.users)}
                    </Text>
                    <Text fontSize="xs" fontWeight="normal" color={onlineUsers && onlineUsers.includes(getSenderFull(user, selectedChat.users)?._id) ? "green.500" : "gray.500"}>
                      {onlineUsers && onlineUsers.includes(getSenderFull(user, selectedChat.users)?._id) ? "● Online" : "● Offline"}
                    </Text>
                  </Box>
                </Box>
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Box>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="rgba(240, 244, 248, 0.6)"
            backdropFilter="blur(5px)"
            boxShadow="inset 0 2px 4px rgba(0,0,0,0.06)"
            w="100%"
            h="100%"
            borderRadius="xl"
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
              <div className="messages" style={{ display: "flex", flexDirection: "column", overflowY: "scroll", scrollbarWidth: "none" }}>
                <ScrollableChat messages={messages} />
              </div>
            )}
            
            <FormControl onKeyDown={sendMessage} mt={3}>
              {isTyping ? <div>Typing...</div> : <></>}
              {mediaLoading && <Spinner alignSelf="center" />}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
                <IconButton
                  aria-label="Upload media"
                  icon={<AttachmentIcon />}
                  ml={2}
                  onClick={() => document.getElementById("media-upload").click()}
                  isLoading={mediaLoading}
                />
                <input
                  type="file"
                  id="media-upload"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={(e) => postMedia(e.target.files[0])}
                />
              </div>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="'Inter', 'Work sans', sans-serif" color="gray.400">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
