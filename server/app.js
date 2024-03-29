import express from "express"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"
import { errormiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser"

import userRoute from "./routes/user.js"
import chatRoute from "./routes/chat.js"
import adminRoute from "./routes/admin.js"


dotenv.config({
    path:"./.env",
});

const mongoURL = process.env.MONGO_URL ;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const adminSecretKey = process.env.ADMIN_SECRET_KEY ;


connectDB(mongoURL);


const app = express();


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

app.use(errormiddleware)

app.listen(port,()=>{
    console.log(`App is Listening at the port number ${port} in ${envMode} Mode`);
    
})

export {envMode,adminSecretKey}