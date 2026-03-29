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
      bg="white"
        w="100%"
        m="40px 0 15px 0"
      p={4}
      borderRadius="lg"
        borderWidth="1px"
        d='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black" align="center">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
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
