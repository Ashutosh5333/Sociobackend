 const app =require("./main")
 const dotenv = require("dotenv");
 dotenv.config({path:"config/config.env"})

 const ConnectDatabase = require("./config/connect.db")

  const port  = process.env.PORT || 8000;

  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
  });

  const server = app.listen(port, async () => {
  await ConnectDatabase();
  console.log(`Server Runing on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhabled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});