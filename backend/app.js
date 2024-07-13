const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const RecipeRouter = require("./routes/RecipeRoute");
const AuthRouter = require("./routes/AuthRoute");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(cors());

app.use("/api/recipes", RecipeRouter);
app.use("/api/auth", AuthRouter);
module.exports = app;
