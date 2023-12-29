const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome our Home");
});

const user = require("./routes/user.route");
const PostRouter = require("./routes/social.route");

app.use("/user", user);
app.use("/posts",PostRouter)

module.exports = app;
