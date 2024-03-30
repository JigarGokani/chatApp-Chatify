import express from "express"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"
import { errormiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser"
import {Server} from "socket.io"
import userRoute from "./routes/user.js"
import chatRoute from "./routes/chat.js"
import adminRoute from "./routes/admin.js"
import {createServer} from "http"
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import {v4 as uuid} from "uuid"
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config({
    path:"./.env",
});

const mongoURL = process.env.MONGO_URL ;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const adminSecretKey = process.env.ADMIN_SECRET_KEY ;
const userSocketIDs = new Map();

connectDB(mongoURL);


const app = express();
const server = createServer(app);
const io = new Server(server,{})


// Using Middlewares Here
app.use(express.json());
app.use(cookieParser());

// Mouting the routes
app.use("/user",userRoute);
app.use("/chat",chatRoute);
app.use("/admin",adminRoute);



app.get("/",(req,res)=>{
    res.send("Welcome to our Chatify App!")
})

io.on("connection",(socket)=>{

    const user ={
        _id:"asdasd",
        name:"Nambo"
    }
    userSocketIDs.set(user._id.toString(),socket.id);

    console.log("A User is Connected",socket.id);
    console.log(userSocketIDs);
    

    socket.on(NEW_MESSAGE,async({chatId,members,message})=>{

        const messageForRealTime = {
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name,
            },
            chat:chatId,
            createdAt:new Date().toISOString(),
        }

        const messageForDB = {
            content:message,
            sender:user._id,
            chat:chatId,
        }

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE,{
            chatId,
            message:messageForRealTime,
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId})
        
        try{
            await Message.create(messageForDB)

        }catch(error){
            console.log(error);
            
        }
    
    }) 


    socket.on("disconnect",()=>{
        console.log("User Disconnected!");
        userSocketIDs.delete(user._id.toString());
    })
})



app.use(errormiddleware)

server.listen(port,()=>{
    console.log(`App is Listening at the port number ${port} in ${envMode} Mode`);
    
})

export {envMode,adminSecretKey,userSocketIDs}