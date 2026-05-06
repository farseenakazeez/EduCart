import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js"


const registerUser = asyncHandler(async(req,res)=>{
    const{name,email,password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(401);
        throw new Error("user already exists");
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id : user._id,
                email: user.email,
                name:user.name,
                isAdmin:user.isAdmin,

        });
    } else {

    res.status(400);
    throw new Error("Invalid user Data");
    }
});


const authUser = asyncHandler(async(req,res)=>{

    const {email , password} = req.body;
    const user =  await User.findOne({ email})
        if(user && (await user.matchPassword(password))){
            generateToken(res,user._id);;
           
                
                res.json({
                _id : user._id,
                email: user.email,
                name:user.name,
                isAdmin:user.isAdmin,
                
            });

        } else {
            res.status(404);
            throw new Error("Invald email and password");
        }

    });
    
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0),
    });
    res.status(200).json({message:"logout successfully"});
});
    


const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id : user._id,
                email: user.email,
                name:user.name,
                isAdmin:user.isAdmin,

        })
    } else {
        res.status(404);
        throw new Error("user not found");
    }
});

const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name =req.body.name || user.name;
        user.email = req.body.email ||user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.json({
            _id : user._id,
                email: user.email,
                name:user.name,
                isAdmin:user.isAdmin,

        })
    } else {
        res.status(404);
        throw new Error("user not found");
    }
    
});

const getUsers = asyncHandler(async(req,res)=>{
    res.send("get all users");
});

const deleteUser = asyncHandler(async(req,res)=>{
    res.send("delete users");
});

const getUserById = asyncHandler(async(req,res)=>{
    res.send("get user by Id");
});

const updateUser = asyncHandler(async(req,res)=>{
    res.send("update User");
});
export{
    registerUser,
    authUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
};