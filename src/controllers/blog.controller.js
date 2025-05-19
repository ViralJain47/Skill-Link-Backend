import Blog from "../models/blog.model.js";
import mongoose from "mongoose";
import fs from 'fs'
import { __rootFolder } from "../utils/storage.js";

const getBlogInfo = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blogInfo = await Blog.findById(blogId).populate("createdBy");
    res.status(200).json(blogInfo);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    logger.error(error.message)
    res.status(500).json({ error: "Internal server error" });
  }
};

const createBlog = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "file is corrupted" });
    }

    const { title, body, createdBy, rating, category } = req.body;
    const image = req.file.filename;
    const imageUrl = `/storage/${image}`;

    const newBlog = await Blog.create({
      title,
      body,
      coverImage: imageUrl,
      createdBy,
      rating,
      category,
    });

    if (!newBlog) {
      return res.status(401);
    }

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    logger.error(error.message)
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find({}).populate("createdBy");
    res.status(200).json(allBlogs);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    logger.error(error.message)
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(400).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    logger.error(error.message)
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(400).json({ message: "Blog not found" });
    }

    const filePath = `${__rootFolder}${deletedBlog.coverImage}`

    fs.access(filePath, fs.constants.F_OK, err => {
      if(err) logger.error(err)

      fs.unlink(filePath, (err) =>{
        if (err) logger.error(err)
      })
    })

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return next(error);
    }
    logger.error(error.message)
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createBlog, getAllBlogs, deleteBlog, updateBlog, getBlogInfo };
