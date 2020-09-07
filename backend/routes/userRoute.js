import express, { request, response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { isAuth } from "../utils";
import jwtCheck from "../jwtCheck";


const userRouter = express.Router();

userRouter.post(
    "/signin",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({ min: 6 })
    ],
    (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            response.send({
                validationError : errors.array({ onlyFirstError: true })
            });

            return;
        }

        User.findOne({
            email    : request.body.email,
            password : request.body.password
        })
            .then((data) => {
                jwt.sign(
                    { id: data.id, isAdmin: data.isAdmin, name: data.name },
                    "secretKey",
                    { expiresIn: 86000 },
                    (err, token) => {
                        if (err) throw err;
                        response.send({ token, name: data.name });
                    }
                );
            })
            .catch((err) => response.send({ msg: "Invalid email or password" }));
    }
);

userRouter.post(
    "/register",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Password must be greater than 6 characters").isLength({ min: 6 })
    ],
    (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({
                validationError : errors.array({ onlyFirstError: true })
            });
        }

        const user = new User({
            name     : request.body.name,
            email    : request.body.email,
            password : request.body.password
        });


        user
            .save()
            .then((data) => {
                jwt.sign({ id: data.id, name: data.name }, "secretKey", { expiresIn: 86000 }, (err, token) => {
                    if (err) throw err;
                    response.send({ token, name: data.name });
                });
            })
            .catch((err) => response.send({ msg: "Email already exists" }));
    }
);

userRouter.get("/createadmin", (request, response) => {
    const user = new User({
        name     : "wisdom",
        email    : "freezwiz@hi2.in",
        password : "password",
        isAdmin  : true
    });

    user
        .save()
        .then((data) => response.send("Admin " + data.name + " created"))
        .catch((err) => response.send({ msg: err }));
});

userRouter.get("/checkuser",jwtCheck, (request,response)=>{
    response.send("login successful")
})

export default userRouter;
