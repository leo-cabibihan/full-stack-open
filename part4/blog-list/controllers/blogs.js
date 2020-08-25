const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//replace this with app.use("/api/blogs",blogsRouter) inside app.js
blogsRouter.get("/", async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
  const blogs = await Blog.find({ _id: req.params.id });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
});

blogsRouter.delete("/:id", async (req, res, next) => {
  await Blog.findByIdAndDelete({ _id: req.params.id });
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  const update = { likes: blog.likes + 1 };
  await blog.updateOne(update);
  res.status(200).end();
});

module.exports = blogsRouter;
