const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/blogs.json");

const readBlogs = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};


const writeBlogs = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

router.get("/", (req, res) => {
  const blogs = readBlogs();
  res.json(blogs);
});


router.get("/:id", (req, res, next) => {
  const blogs = readBlogs();
  const blog = blogs.find((b) => b.id === parseInt(req.params.id));

  if (!blog) {
    const error = new Error("Blog not found");
    error.status = 404;
    return next(error);
  }

  res.json(blog);
});


router.post("/", (req, res) => {
  const blogs = readBlogs();
  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  blogs.push(newBlog);
  writeBlogs(blogs);

  res.status(201).json(newBlog);
});


router.put("/:id", (req, res, next) => {
  const blogs = readBlogs();
  const blogIndex = blogs.findIndex((b) => b.id === parseInt(req.params.id));

  if (blogIndex === -1) {
    const error = new Error("Blog not found");
    error.status = 404;
    return next(error);
  }

  blogs[blogIndex] = { ...blogs[blogIndex], ...req.body };
  writeBlogs(blogs);

  res.json(blogs[blogIndex]);
});


router.delete("/:id", (req, res, next) => {
  let blogs = readBlogs();
  const blogIndex = blogs.findIndex((b) => b.id === parseInt(req.params.id));

  if (blogIndex === -1) {
    const error = new Error("Blog not found");
    error.status = 404;
    return next(error);
  }

  blogs.splice(blogIndex, 1);
  writeBlogs(blogs);

  res.json({ success: true, message: "Blog deleted" });
});

module.exports = router;
