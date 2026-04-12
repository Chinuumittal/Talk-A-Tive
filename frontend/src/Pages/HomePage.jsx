import React from 'react'
import { Container,Box,Text,Tabs,TabList,TabPanels,TabPanel, Tab } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
const HomePage = () => {

  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);
  return (
    <Container maxW='xl' centerContent>
      <Box
        bg="rgba(255, 255, 255, 0.15)"
        backdropFilter="blur(20px)"
        borderColor="whiteAlpha.500"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.2)"
        w="100%"
        m="40px 0 15px 0"
        p={4}
        borderRadius="xl"
        borderWidth="1px"
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Text fontSize="4xl" fontFamily="'Outfit', sans-serif" fontWeight="bold" color="white" align="center" letterSpacing="wide">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="rgba(255, 255, 255, 0.2)" backdropFilter="blur(25px)" borderColor="whiteAlpha.600" color="white" boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.2)" w="100%" p={4} borderRadius="2xl" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded" colorScheme="cyan">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
