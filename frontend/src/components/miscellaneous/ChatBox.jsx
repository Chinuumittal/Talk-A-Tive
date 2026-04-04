import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChatState } from '../../context/chatprovider';

const ChatBox = () => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      p={3}
      bg="rgba(255, 255, 255, 0.85)"
      backdropFilter="blur(10px)"
      w={{ base: "100%", md: "68%" }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="xl"
    >
      {selectedChat ? (
        <Text fontSize="3xl" fontFamily="'Inter', 'Work sans', sans-serif" color="gray.600">
          Chat content goes here...
        </Text>
      ) : (
        <Text fontSize="3xl" fontFamily="'Inter', 'Work sans', sans-serif" color="gray.400">
          Click on a user to start chatting
        </Text>
      )}
    </Box>
  );
};

export default ChatBox;