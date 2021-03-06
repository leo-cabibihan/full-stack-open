const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { response } = require("express");
const bcrypt = require("bcryptjs");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);
  res
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id });
});

//modify blog so that only people with a valid token can upload a blog

module.exports = loginRouter;
