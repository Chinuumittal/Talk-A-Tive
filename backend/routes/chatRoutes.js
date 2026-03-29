import express from 'express';
import { chats } from '../data/data.js';
import router from './userRoutes.js';
import { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } from '../controllers/chatcontrollers.js';
import protect from '../middleware/authmiddleware.js';
const chatRoutes = express.Router();
chatRoutes.route('/').post(protect, accessChat); // if logged in then only access chat
chatRoutes.route('/').get(protect, fetchChats);
chatRoutes.route("/group").post(protect, createGroupChat);
chatRoutes.route("/rename").put(protect, renameGroup);
chatRoutes.route("/groupadd").put(protect, addToGroup);
chatRoutes.route("/groupremove").put(protect, removeFromGroup);

export default chatRoutes;