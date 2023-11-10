const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcrypt");
//@desc Register user
//@route POST /api/users
//@access public 

const registerUser = asyncHandler(async (req,res) => {
    const {username , email , password} = req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("ALL Fields are Mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("Email All Ready in Use!");
    }


    //Hash Password
    const hashedPassword = await bcrypt.hash(password , 10);
    const user = User.create({
        username, 
        email,
        password: hashedPassword
    });
    res.json({ message: "Register The User." });
});


//@desc Login user
//@route POST /api/users
//@access public 

const loginUser = asyncHandler(async (req,res) => {
    const {email , password} = req.body;
    if(!email || !password)
    {
        res.send(400);
        throw new Error ("All Fields are Mandatory!!");
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password , user.password)))
    {
        const accessToken = jwt.sign({
            user: {
                username : user.username,
                email : user.email,
                id : user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m"
        })
        res.status(200).json({accessToken});
    }   
    else
    {
        res.status(401);
        throw new Error ("Email Or Password Invalid !!");
    }
});


//@desc Current User
//@route GET /api/users
//@access private 

const currentUser = asyncHandler(async (req,res) => {
    res.json(req.user);
});


module.exports = {registerUser , loginUser , currentUser}