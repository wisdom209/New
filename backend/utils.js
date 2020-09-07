import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from "./config";
import { response } from "express";

dotenv.config();
const jwtSecret = config.jwtSecret;


// const isAuth = function(req, res, next) {
//     const token = req.header("token");
//     if (!token) return res.status(401).json({ message: "Auth Error" });  try {
//       const decoded = jwt.verify(token, "randomString");
//       req.user = decoded.user;
//       next();
//     } catch (e) {
//       console.error(e);
//       res.status(500).send({ message: "Invalid Token" });
//     }
//   }

export const isAuth = (request, response, next)=>{
    const token = request.headers.authorization
    if(!token){
        return response.send({msg : "auth error"})   
    }

    try{
        const decoded = jwt.verify(token.slice(7, token.length), "secretkey")
        request.user = decoded
        if(request.user.isAdmin){
            next()
            return response.send("successful")
          
        }else{
            response.send("has to be admin")
        }

    }catch(error){
        console.log(error)
    }
    
}
