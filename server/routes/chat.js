import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, sendAttachments } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router()


// From here user must be login to proceed further to access the routes
app.use(isAuthenticated);

app.post("/new",newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.put("/removemember",removeMember);
app.delete("/leave/:id",leaveGroup);

// Send Attachments
app.post(
    "/message",
    attachmentsMulter,
    sendAttachments
  );



export default app;