import { useContext } from "react";
import { use } from "react";
import { createContext, useState } from "react"; 
import { useEffect } from "react";
import { useHistory } from "react-router-dom";   

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const[chats,setChats]=useState([]);
    const [user, setUser] = useState(null);
    const history = useHistory();
    useEffect(() => {
         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        
        if (!userInfo) {
            history.push("/");
        } 
    }, [history]);
    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat, user, setUser, chats, setChats }}>
            {children}
        </ChatContext.Provider>
    );
}
export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
