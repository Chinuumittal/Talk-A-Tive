import express from 'express';
import { registerUser,authUser,allUsers } from '../controllers/controllers.js';
import protect from '../middleware/authmiddleware.js';
const router = express.Router();
router.route('/').post(registerUser).get(protect,allUsers);
router.route('/login').post(authUser);

export default router;  