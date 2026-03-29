import React from 'react'
import { ChatState } from '../../context/chatprovider';
import { useState } from 'react';
import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, MenuItem, Avatar, MenuDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input } from '@chakra-ui/layout'; 
import {Avatar} from '@chakra-ui/avatar';

const UserListItem = ({ user, handleFunction }) => {
    const{user}=ChatState();
  return (
    <div>
      
    </div>
  )
}

export default UserListItem
