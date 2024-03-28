import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken,cookieOptions } from "../utils/features.js";
import { Error } from "mongoose";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "asdasd",
    url: "asdasd",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User Created!!");
};

const login = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username }).select("+password");
  
    if (!user) return next(new ErrorHandler("Invalid Username or Password",404));
  
    const isMatch = await compare(password, user.password);
  
    if (!isMatch) return next(new ErrorHandler("Invalid Password or Password",404));
  
    sendToken(res, user, 201, `Welcome Back,${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.user);
  
    if (!user) return next(new ErrorHandler("User not found", 404));
  
    res.status(200).json({
      success: true,
      user,
    });
  });

const logout = TryCatch(async (req, res) => {
    return res
      .status(200)
      .cookie("chatify-token", "", { ...cookieOptions, maxAge: 0 })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  });

const searchUser = TryCatch(async(req,res)=>{
    const {name} = req.query;

    return res.status(200).json({
        success:true,
        message:name,
    })
})

export { login, newUser, getMyProfile,logout,searchUser };
