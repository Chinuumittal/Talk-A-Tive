import React from 'react';
import { Box } from '@chakra-ui/react';
import { ChatState } from '../../context/chatprovider';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="rgba(255, 255, 255, 0.75)"
      backdropFilter="blur(16px)"
      w={{ base: "100%", md: "68%" }}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="whiteAlpha.600"
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.15)"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;