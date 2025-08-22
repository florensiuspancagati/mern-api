const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const BlogPost = require('../models/blog');

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const err = new Error('Validation failed, entered data is incorrect.');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };

    if(!req.file) {
        const err = new Error('No image provided.');
        err.errorStatus = 422;
        throw err;
    }
    
    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {uid: 1, name: "panca"}
    });

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Blog post created successfully',
            data: result
        });
    })
    .catch(err => {err});
}

exports.getAllBlogPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    BlogPost.find()
    .countDocuments()
    .then(count => {
        totalItems = count;

        return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => {
        res.status(200).json({
            message: 'Fetched all blog post successfully',
            data: result,
            total_data: totalItems,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage)
        });
    })
    .catch(err => { next(err); });

    // BlogPost.find()
    // .then(result => {
    //     res.status(200).json({
    //         message: 'Fetched all blog post successfully',
    //         data: result
    //     });
    // })
    // .catch(err => { next(err);});
}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    BlogPost.findById(postId)
    .then(result => {
        if(!result) {
            const err = new Error('Could not find blog post.');
            err.errorStatus = 404;
            throw err;
        }
        res.status(200).json({
            message: 'Fetched blog post successfully',
            data: result
        });
    })
    .catch(err => { next(err); });
}

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const err = new Error('Validation failed, entered data is incorrect.');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    };

    if(!req.file) {
        const err = new Error('No image provided.');
        err.errorStatus = 422;
        throw err;
    }
    
    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post) {
            const err = new Error('Could not find blog post.');
            err.errorStatus = 404;
            throw err;
        }

        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Blog post updated successfully',
            data: result
        });
    })
    .catch(err => { next(err); });
}

// Function to remove image file from the server
const removeImage = (filePath)  => {
    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => console.log(err));
}

exports.deleteBlogPost = (req, res, next) => {
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post) {
            const err = new Error('Could not find blog post.');
            err.errorStatus = 404;
            throw err;
        }

        removeImage(post.image);
        return BlogPost.findByIdAndDelete(postId);
    })
    .then(result => {
        res.status(200).json({
            message: 'Blog post deleted successfully',
            data: result
        });
    })
    .catch( err => { next(err); });
}