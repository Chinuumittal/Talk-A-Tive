import React from 'react';
import axios from 'axios';
import { ChatState } from '../../context/chatprovider'; 
import { Box, Button, Text, Spinner, useToast, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react'; 
import { AddIcon } from '@chakra-ui/icons';
import { getSender } from '../../congif/ChatLogics';
import GroupChatModal from './GroupChatModal';

const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const { onOpen } = useDisclosure();
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchChats = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  const getSenderName = (loggedUser, users) => {
    if (!loggedUser || !users || users.length < 2) return users[0]?.name || "Unknown User";
    return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={4}
      bg="rgba(255, 255, 255, 0.75)"
      backdropFilter="blur(16px)"
      w={{ base: "100%", md: "31%" }}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="whiteAlpha.600"
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.15)"
    >
      <Box
        pb={4}
        px={3}
        fontSize={{ base: "24px", md: "28px" }}
        fontFamily="'Inter', 'Work sans', sans-serif"
        fontWeight="bold"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          bgGradient="linear(to-r, teal.500, blue.500)"
          bgClip="text"
        >
          My Chats
        </Text>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "14px", md: "13px" }}
            rightIcon={<AddIcon />}
            bgGradient="linear(to-r, teal.400, teal.500)"
            color="white"
            borderRadius="lg"
            px={4}
            py={2}
            _hover={{
              bgGradient: "linear(to-r, teal.500, teal.600)",
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            transition="all 0.2s"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="transparent"
        w="100%"
        h="100%"
        borderRadius="2xl"
        overflowY="auto"
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" h="100%">
            <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" />
          </Box>
        ) : chats && chats.length > 0 ? (
          <Stack spacing={3}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "linear-gradient(to right, #38B2AC, #4FD1C5)" : "rgba(255, 255, 255, 0.4)"}
                color={selectedChat === chat ? "white" : "gray.800"}
                px={4}
                py={3}
                borderRadius="xl"
                key={chat._id}
                boxShadow={selectedChat === chat ? "0px 4px 15px rgba(56, 178, 172, 0.3)" : "sm"}
                transform={selectedChat === chat ? "scale(1.02)" : "scale(1)"}
                _hover={{
                  bg: selectedChat === chat ? "linear-gradient(to right, #319795, #38B2AC)" : "rgba(255, 255, 255, 0.8)",
                  transform: "scale(1.02)",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
                }}
                transition="all 0.3s ease"
              >
                <Text fontWeight={selectedChat === chat ? "bold" : "semibold"} fontSize="md">
                  {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text 
                    fontSize="sm" 
                    color={selectedChat === chat ? "whiteAlpha.800" : "gray.500"}
                    noOfLines={1}
                    mt={1}
                  >
                    <b>{chat.latestMessage.sender.name}: </b>
                    {chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" h="100%" flexDir="column">
            <Text fontSize="lg" color="gray.400" mb={3}>No chats yet</Text>
            <Button colorScheme="teal" variant="outline" onClick={onOpen}>
              Start a conversation
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
