import Blog from "../models/blog.model.js";
import mongoose from "mongoose";

const createBlog = async (req, res,next) => {
    try {
        const { title, body, coverImage, createdBy } = req.body;
        console.log(req.body);

        const newBlog = await Blog.create({
            title,
            body,
            coverImage,
            createdBy
        })

        if (!newBlog) {
            return res.status(401)
        }

        res.status(201).json({ message: "Blog created successfully", blog: newBlog })

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllBlogs = async (req, res, next) => {
    try {
        const allBlogs = await Blog.find({}).populate("createdBy")
        res.status(200).json(allBlogs)
    }
    catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }

}

const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        const updatedBlog = await Blog.findByIdAndUpdate(id, { ...req.body }, { new: true });

        if (!updatedBlog) {
            return res.status(400).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        res.status(500).json({ error: 'Internal server error' });
    }
}
const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(400).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { createBlog, getAllBlogs, deleteBlog, updateBlog }