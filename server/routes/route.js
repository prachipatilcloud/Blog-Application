import express from 'express';

import { signupUser,loginUser }from '../controller/user-controller.js'
import { uploadImage,getImage } from '../controller/image-controller.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { logoutUser } from '../controller/user-controller.js';
import { newComment,getComments, deleteComment } from '../controller/comment-controller.js';

import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create' ,createPost);
router.get('/posts', getAllPosts);
router.get('/post/:id', getPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.post('/comment/new', newComment);
router.get('/comments/:id', getComments);
router.delete('/comment/delete/:id', deleteComment);

export default router;