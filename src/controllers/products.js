exports.createProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    res.json({
        message: "Product created successfully",
        data: {
            id: 1,
            name: name,
            price: price
        }
    });
    next();
};

exports.getAllProducts = (req, res, next) => {
    res.json({
        message: "List of all products",
        data: [
            { name: "Florensius Panca Gati", email: "aaa@bbb.ccc" },
            { name: "John Doe", email: "asdf@gsa.ake" }
        ]
    });
    next();
};