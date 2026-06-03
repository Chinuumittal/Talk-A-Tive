import React from 'react';
import { Avatar, AvatarBadge, Box, Text } from '@chakra-ui/react';
import { ChatState } from '../../context/chatprovider';

const UserListItem = ({ user, handleFunction }) => {
    const { onlineUsers } = ChatState();
    const isOnline = onlineUsers && onlineUsers.includes(user._id);

    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            >
                {isOnline && <AvatarBadge boxSize="1.25em" bg="green.500" />}
            </Avatar>
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    );
};

export default UserListItem;
