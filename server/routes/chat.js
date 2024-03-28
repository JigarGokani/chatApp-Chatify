import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { addMembers, getMyChats, getMyGroups, newGroupChat } from "../controllers/chat.js";

const app = express.Router()


// From here user must be login to proceed further to access the routes
app.use(isAuthenticated);

app.post("/new",newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);



export default app;