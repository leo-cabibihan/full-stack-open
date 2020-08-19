const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
console.log(config.PORT);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });
app.use(cors());
app.use(express.json());

const blogsRouter = require("./controllers/blogs");
app.use("/api/blogs", blogsRouter);
const middleware = require("./utils/middleware");

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
