import express from 'express';
import { chats } from './data/data.js';
import dotenv from 'dotenv';
import connectDB from './congif/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { notfound, errorHandler } from './middleware/errormiddleware.js';
dotenv.config();
connectDB();
const app = express();
app.use(express.json()); // to accept json data from the client
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.use('/api/user', userRoutes); 
app.use('/api/chat', chatRoutes);
app.use(notfound);
app.use(errorHandler);
