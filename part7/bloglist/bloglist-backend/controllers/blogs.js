const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//replace this with app.use("/api/blogs",blogsRouter) inside app.js
blogsRouter.get("/", async (req, res, next) => {
  const blogs = await Blog.find({})
    .populate("user", {
      username: 1,
      name: 1,
      id: 1,
    })
    .sort("-likes");
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
  const blogs = await Blog.find({ _id: req.params.id }).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  const { userId, ...body } = req.body;
  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    ...body,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

// only the user who created the post can delete
blogsRouter.delete("/:id", async (req, res, next) => {
  console.log(req.params.id);
  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
  const blog = await Blog.findById(req.params.id);

  if (!req.token || !decodedToken.id || !blog) {
    return res.status(401).json({ error: "token missing or invalid" });
  } else if (blog.user.toString() === req.body.userId.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    console.log("yes very nice");
    res.status(204).end();
  } else {
    console.log("oops");
    return res.status(401).json({ error: "action not permitted for user" });
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  const update = { likes: blog.likes + 1 };
  await blog.updateOne(update);
  res.status(200).end();
});

blogsRouter.post("/:id/comments", async (req, res) => {
  console.log(req.body);
  const comment = req.body.comment;
  if (!req.body.comment) {
    res.status(401).json({ error: "badly formatted request" });
  }
  const blog = await Blog.findById(req.params.id);
  blog.comments.push(comment);
  await blog.save();
  res.status(200).end();
});

module.exports = blogsRouter;
