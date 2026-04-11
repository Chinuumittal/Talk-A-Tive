import express from 'express';
import { chats } from './data/data.js';
import dotenv from 'dotenv';
import connectDB from './congif/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { notfound, errorHandler } from './middleware/errormiddleware.js';
import { Server } from 'socket.io'; // Added Socket.io

dotenv.config();
connectDB();
const app = express();
app.use(express.json()); // to accept json data from the client

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.use('/api/user', userRoutes); 
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use(notfound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173", // Vite default port
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
