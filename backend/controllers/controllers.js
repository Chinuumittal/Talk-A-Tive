import asyncHandler from 'express-async-handler';
import User from '../models/usermodel.js';
import generateToken from '../congif/generatetoken.js';
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password,pic} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const userData = { name, email, password };
    if (pic && pic.trim() !== "") {
        userData.pic = pic;
    }
    const user = await User.create(userData);
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});
  const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({ //prints on log 
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
  });
const allUsers = asyncHandler(async (req,res) => {
    const keyword = req.query.search
    ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    }
    : {};
    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});// for this we did authorization middleware
    res.send(users);
});
 export {registerUser,authUser,allUsers};