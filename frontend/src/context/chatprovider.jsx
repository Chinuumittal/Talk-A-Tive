import { useContext } from "react";
import { use } from "react";
import { createContext, useState } from "react"; 
import { useEffect } from "react";
import { useHistory } from "react-router-dom";   
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState([]);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        
        if (!userInfo) {
            history.push("/");
        } 
    }, [history]);

    useEffect(() => {
        if (user) {
            const newSocket = io(ENDPOINT);
            setSocket(newSocket);

            newSocket.emit("setup", user);

            newSocket.on("online users", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                newSocket.disconnect();
            };
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            setOnlineUsers([]);
        }
    }, [user]);

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat, user, setUser, chats, setChats, notification, setNotification, socket, onlineUsers }}>
            {children}
        </ChatContext.Provider>
    );
}
export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
