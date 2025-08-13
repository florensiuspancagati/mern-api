exports.createBlogPost = (req, res, next) => {
    const title = req.body.title;
    // const image = req.body.image;
    const body = req.body.body;

    const result = {
        message: 'Blog post created successfully',
        data: {
            post_id: 1,
            title: "title blog",
            // image: image,
            body: "body lorem ipsum dolor sit amet",
            created_at: "13/08/2025",
            author: {
                uid: 1,
                name: "john doe"
            }
        }
    };
    res.status(201).json(result);
}