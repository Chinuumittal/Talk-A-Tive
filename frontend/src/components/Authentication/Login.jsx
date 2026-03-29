import React from 'react'
import { useState } from 'react'
import { VStack,FormControl,FormLabel,Input,Button,InputRightElement, InputGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { ChatState } from '../../context/chatprovider';
const Login = () => {
      const taost = useToast();
      const history = useHistory();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [show, setShow] = useState(false);
      const [loading, setLoading] = useState(false);
      const { setUser } = ChatState();
      const handleClick = () => {
          setShow(!show);
      }
    const submitHandler = async () => {
      setLoading(true);
      if(!email || !password){
        taost({
          title: "Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.post("/api/user/login", { email, password });
        taost({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUser(data);
        setLoading(false);
        history.push("/chats");
      } catch (error) {
        taost({
          title: "Error Occured",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    }
    return (
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input value={email} placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input value={password} type={show ? "text" : "password"} placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme="blue" width="100%" style={{marginTop: 15}} onClick={submitHandler}>
          Login
        </Button>
        <Button colorScheme="red" width="100%" style={{marginTop: 15}} isLoading={loading} onClick={()=>{
          setEmail("guest@example.com");
          setPassword("password");
        }}>
          Get Guest User Credentials
        </Button>
      </VStack>
  )
}

export default Login