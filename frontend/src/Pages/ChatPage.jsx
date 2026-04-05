import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { ChatState } from '../context/chatprovider';
import { Box } from '@chakra-ui/react';
import MyChats from '../components/miscellaneous/MyChats';
import ChatBox from '../components/miscellaneous/ChatBox';
import SideDrawer from '../components/miscellaneous/SideDrawer';

const ChatPage = () => {
  const { selectedChat, setSelectedChat, user, setUser } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  // Call ChatState to access the context values
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default ChatPage
