const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/blogs", blogRoutes);

// Error handler
app.use(errorHandler);

// Server start
app.listen(3000, () => {
  console.log("🚀 Blog API running on http://localhost:3000");
});