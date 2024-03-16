import express from "express"
import userRoute from "./routes/user.js"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./.env",
});

const mongoURL = process.env.MONGO_URL ;
const port = process.env.PORT || 3000;
connectDB(mongoURL);


const app = express();


app.use(express.json())


app.use("/user",userRoute);

app.get("/",(req,res)=>{
    res.send("Welcome to our Chatify App!")
})

app.listen(port,()=>{
    console.log(`App is Listening at the port number ${port}`);
    
})