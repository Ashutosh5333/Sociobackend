const express = require("express");
const { UserRegister, loginUser } = require("../controllers/User.controller");

const userRouter = express.Router();

userRouter.post("/register", UserRegister);
userRouter.post("/login", loginUser);


module.exports = userRouter;
