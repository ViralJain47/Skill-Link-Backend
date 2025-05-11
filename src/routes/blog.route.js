import { createBlog, deleteBlog, getAllBlogs, updateBlog } from '../controllers/blog.controller.js';

import { Router } from 'express';

const blogRoute = Router();

blogRoute.post('/create', createBlog);
blogRoute.get('/all', getAllBlogs);
blogRoute.put('/update/:id', updateBlog);
blogRoute.delete('/delete/:id', deleteBlog)


export default blogRoute;