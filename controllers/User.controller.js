const catchAsynErros = require("../middleware/catchError");
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const UserRegister = catchAsynErros(async (req, res, next) => {
  const { email, password, name,gender} = req.body;

  try {
    const userPresent = await UserModel.findOne({ email });
    // console.log("userpreset",userPresent);
    if (userPresent) {
      return res.status(400).json({ msg: "User is already present" });
    }
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Error in hashing password" });
      }
      try {
        const NewUser = new UserModel({
          email,
          password: hash,
           name,
           gender
        });
        await NewUser.save();
        // console.log("uerrrrpasssword", hash);
        res.status(201).json({ msg: "Signup successful" });
      } catch (error) {
        console.error("error form 53", error);
        res
          .status(500)
          .json({ msg: "Something went wrong, please try again later" });
      }
    });
  } catch (error) {
    console.error("error form 58", error);
    res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
});

const loginUser = catchAsynErros(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    //  console.log("userrr",user)
    if (!user) {
      return res.status(404).send({ msg: "User not registered" });
    }
    const hashedPassword = user.password;
    if (!hashedPassword) {
      return res.status(500).send("Hashed password not found");
    }
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      var older_token = jwt.sign(
        {
          userId: user._id,
        },
        "shhhhh"
      );
     
      return res.json({
        msg: "Login successful",
        data: {
          token: older_token,
          name: user.username,
          email: user.email,
          _id: user._id,
        },
      });
    } else {
      return res.status(401).send("Please check password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Authentication failed");
  }
});

module.exports = { UserRegister, loginUser };
