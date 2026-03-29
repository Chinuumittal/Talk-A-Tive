import React from 'react'
import { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, Button, InputRightElement, InputGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { ChatState } from '../../context/chatprovider';
const Signup = () => {
    const taost = useToast();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();
    const handleClick = () => {
        setShow(!show);
    }
  const postDetails = (pics) => {
    setLoading(true);
    if(pics === undefined){
        taost({
            title: "Please Select an Image",
          status: "warning",  
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
    }

        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
          data.append("cloud_name", "dwr8c1dkd");
          fetch("https://api.cloudinary.com/v1_1/dwr8c1dkd/image/upload",{
            method: "post",
            body: data,
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Upload failed: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Cloudinary response:", data);
            setPic(data.secure_url || data.url);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Upload error:", err);
            taost({
                title: "Image Upload Failed",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        });
    }
    else{
        taost({
            title: "Please Select an Image",
          status: "warning",  
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
    }
  }
  const submitHandler = async () => {
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      taost({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if(password !== confirmPassword){
      taost({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
      taost({
        title: "Registration Successful",
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
            title: "Error Occured!",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text" : "password"} placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text" : "password"} placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
          <FormControl id="pic" isRequired>
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" accept="image/*"  placeholder="Profile Picture" onChange={(e)=>postDetails(e.target.files[0])} />
      </FormControl>
      <Button colorScheme="blue" width="100%" onClick={submitHandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup