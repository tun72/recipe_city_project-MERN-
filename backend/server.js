const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
require("dotenv").config();

const app = require("./app");

// GLOBAL
// const URL = process.env.DATABASE.replace(
//   "<password>",
//   process.env.DATABASE_PASSWORD
// );
// LOCAL
// const URL = process.env.DATABASE_LOCAL;


const URL = process.env.MONGODB_URL;


mongoose.connect(URL).then(() => {
  console.log("Database is successfully connected ✅");
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running at port http://localhost:${process.env.PORT} ✅`
    );
  });
});



//   {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true,
//   }

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("Uncaught Exception");
  process.exit(1);
});
