const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const blogController = require('../controllers/blog');

// [post]: /v1/blog/post
router.post('/post',
    [body('title').isLength({min: 5}).withMessage('Title must be at least 5 characters long'),
        body('body').isLength({min: 5}).withMessage('Body must be at least 5 characters long')],
    blogController.createBlogPost);

// [get]: /v1/blog/posts
router.get('/posts', blogController.getAllBlogPosts);

module.exports = router;