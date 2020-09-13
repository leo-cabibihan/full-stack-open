const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//show new user
usersRouter.get("/", async (req, res) => {
  const user = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  res.json(user);
});

usersRouter.get("/:id", async (req, res) => {
  const user = await User.find({ _id: req.params.id }).populate("blogs");
  res.json(user);
});

// create new users
usersRouter.post("/", async (req, res, next) => {
  console.log(req.body);
  const {
    body: { username, password, name },
  } = req;

  if (username.length < 3 || password.length < 3) {
    const error = new Error("password and username need at least 3 characters");
    error.name = "ValidationError";
    next(error);
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username: username,
    name: name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

module.exports = usersRouter;
