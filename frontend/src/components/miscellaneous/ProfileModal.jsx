import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { ViewIcon } from "@chakra-ui/icons"
import {useDisclosure} from "@chakra-ui/hooks"
import React from "react"

const ProfileModal = ({user,children}) => {
    const {isOpen,onOpen,onClose} = useDisclosure();
    return (
        <>
         {children?(
            <span onClick={onOpen}>{children}</span>
         ):(
            <IconButton onClick={onOpen} icon={<ViewIcon/>} d={{base:"flex"}}>
                
            </IconButton>
         )}
            
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay/>
            <ModalContent height="410px">
                    <ModalHeader
                    fontSize="40px"
                    fontFamily="work sans"
                    d="flex"
                    justifyContent="center"
                    >{user.name}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between">
                    <Image src={user.pic} alt={user.name} borderRadius="full" boxSize="150px"/>
                        <Text
                        fontSize={{
                            base:"20px",
                            md:"25px"
                            }}
                        fontFamily="work sans"
                        >
                    gmail:{user.email}
                    </Text>
                    
                    </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ProfileModal