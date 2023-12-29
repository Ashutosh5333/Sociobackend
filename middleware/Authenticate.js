const jwt = require("jsonwebtoken")


const Authenticate = async(req,res,next) =>{

     const token = req.headers?.authorization?.split(" ")[1];
      //    console.log("token",token )
      
       if(token){
        const decoded = jwt.verify(token,"shhhhh")
         if(decoded){
            const userId = decoded.userId
            req.userId = userId;
          next()
         }else{
            res.send({ msg: "you are not authenticated login please" });
         }
       }
       else{
        res.send({msg:"you rae not authenticated"})
       }

 }

 module.exports=Authenticate