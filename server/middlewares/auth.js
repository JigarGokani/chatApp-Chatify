import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";


const isAuthenticated = TryCatch((req, res, next) => {
    const token = req.cookies["chatify-token"];
    if (!token)
      return next(new ErrorHandler("Please login to access this route", 401));
  
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    
    req.user = decodedData._id;
  
    next();
  });
  

export {isAuthenticated};