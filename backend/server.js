const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const env = require("dotenv");
env.config();

const app = express();


const RecipeRouter = require("./routes/RecipeRoute");
const AuthRouter = require("./routes/AuthRoute");



app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use("/api/recipes", RecipeRouter);
app.use("/api/auth", AuthRouter);



const URL = process.env.MONGODB_URL;


mongoose.connect(URL).then(() => {
  console.log("Database is successfully connected ✅");
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running at port http://localhost:${process.env.PORT} ✅`
    );
  });
});

