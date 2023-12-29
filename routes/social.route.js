const express = require("express");
const { createPost,  getMyPost, editpost, deletepost, getAllSocialsinglepost } = require("../controllers/social.controller");
const Authenticate = require("../middleware/Authenticate");

const PostRouter =  express.Router()

PostRouter.post("/add" ,Authenticate, createPost)
PostRouter.get("/", Authenticate,getMyPost)


PostRouter.patch("/update/:id", Authenticate, editpost)
PostRouter.delete("/delete/:id", Authenticate, deletepost)

PostRouter.get("/:id",Authenticate, getAllSocialsinglepost)




module.exports=PostRouter