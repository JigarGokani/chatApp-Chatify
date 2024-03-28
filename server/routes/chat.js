import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"

const app = express.Router()


// From here user must be login to proceed further to access the routes
app.use(isAuthenticated);


export default app;