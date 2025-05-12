import { createBlog, deleteBlog, getAllBlogs, updateBlog, getBlogInfo } from '../controllers/blog.controller.js';

import { Router } from 'express';
import { upload } from '../utils/storage.js';

const blogRoute = Router();

blogRoute.post('/create', upload.single("coverImage") ,createBlog);
blogRoute.get('/all', getAllBlogs);
blogRoute.put('/update/:id', updateBlog);
blogRoute.delete('/delete/:id', deleteBlog)
blogRoute.get('/:id', getBlogInfo)

export default blogRoute;