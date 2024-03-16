import {User} from "../models/user.js"
import { sendToken } from "../utils/features.js";

const newUser = async(req,res)=>{

    const {name,username,password,bio} = req.body;

    const avatar = {
        public_id:"asdasd",
        url:'asdasd',
    }

    const user = await User.create({
        name,
        bio,
        username,
        password,
        avatar
    })

    sendToken(res,user,201,"User Created!!")

}


const login=(req,res)=>{

    res.send("Welcome to the login route!")

}


export {login,newUser};