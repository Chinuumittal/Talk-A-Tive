import re

with open('src/components/miscellaneous/MyChats.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add notification to ChatState destructuring
text = re.sub(
    r'const \{ selectedChat, setSelectedChat, user, chats, setChats \} = ChatState\(\);',
    r'const { selectedChat, setSelectedChat, user, chats, setChats, notification } = ChatState();',
    text
)

# Find the chat.map block and inject the indicator and layout
old_block = """            {chats.map((chat) => (
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
            ))}"""

new_block = """            {chats.map((chat) => {
              const unreadCount = notification.filter(n => n.chat._id === chat._id).length;
              return (
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box maxWidth="80%">
                  <Text fontWeight={selectedChat === chat ? "bold" : "semibold"} fontSize="md" isTruncated>
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
                {unreadCount > 0 && (
                  <Text
                    fontSize="xs"
                    bg="red.500"
                    color="white"
                    px={2}
                    py={1}
                    borderRadius="full"
                    fontWeight="bold"
                    flexShrink={0}
                  >
                    {unreadCount} New
                  </Text>
                )}
              </Box>
            )})}"""

text = text.replace(old_block, new_block)

with open('src/components/miscellaneous/MyChats.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("MYCHATS UPDATED")
