const catchAsyncErrors = require("../middleware/catchError");

const { SocioMasaiModel } = require("../models/social.model");

  /// user find data public


  
  const createPost = async (req, res) => {
    try {
      let device = 'UNKNOWN'; 
      const userAgent = req.headers['user-agent'];
  
      if (userAgent.includes('Mobile')) {
        device = 'MOBILE';
      } else if (userAgent.includes('Tablet')) {
        device = 'TABLET';
      } else if (userAgent.includes('Windows') || userAgent.includes('Macintosh')) {
        device = 'PC';
      }
        //  const payload ={
        //   body, title, userId, device
        //  }
        const userdata = {
                ...req.body,
                postedby: req.userId,
                userId:req.userId
              };
       const newPost = await SocioMasaiModel.create(userdata);
      // res.status(201).json({ message: 'Post created successfully', post: payload });

      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
   /// get Alll my post
  
  const getMyPost = catchAsyncErrors(async (req, res) => {
        // console.log("userid********",req.userId)
    try {
      const productData = await SocioMasaiModel.find({ userId: req.userId})
      .populate("postedby", ["name", "email", "pic"]);
      res.send(productData);
    } catch (err) {
      console.log(err);
      res.send("Not authorized");
    }
  });

   /// single
    const getAllSocialsinglepost = catchAsyncErrors(async (req, res) => {
      const prodId = req.params.id;
      const userId = req.userId;
          // console.log("userId",userId)
      try {
           const singlepost = await SocioMasaiModel.findOne({_id:prodId})
        res.send(singlepost);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

 
      /*** Edit post */
  
  const editpost = catchAsyncErrors(async (req, res) => {
    const prodId = req.params.id;
    const userId = req.userId;
    const payload = req.body;
           console.log("Userid***",userId)
    try {
      const productData = await SocioMasaiModel.findOne({ _id: prodId });
        // console.log("productdata*********",productData.userId)
      if (userId !== productData.userId) {
        return res.status(401).send("You are not authorized");
      } else {
        const updatedProduct = await SocioMasaiModel.findByIdAndUpdate(
          { _id: prodId },
          payload,
          {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          }
        );
        res.status(200).json({
          success: true,
          msg: "Data updated successfully",
          updatedProduct,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Something went wrong" });
    }
  });
  
   /*** Deleted post */
  
  const deletepost = catchAsyncErrors(async (req, res) => {
    const prodId = req.params.id;
    const userId = req.userId;
  //   console.log("userid*****",userId)
  
    try {
      const productData = await SocioMasaiModel.findOne({ _id: prodId });
      console.log("product*****",productData.userId)
      if (userId !== productData.userId) {
        return res.status(401).send("You are not authorized");
      } else {
        await SocioMasaiModel.findOneAndDelete({ _id: prodId });
        res.send({ msg: "Post deleted successfully" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Something went wrong" });
    }
  });
  


  module.exports={getMyPost,createPost,editpost,deletepost,getAllSocialsinglepost}