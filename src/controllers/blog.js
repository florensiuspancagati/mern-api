const { validationResult } = require('express-validator');
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