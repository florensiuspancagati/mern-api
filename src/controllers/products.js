exports.createProduct = (req, res, next) => {
    res.json({
        message: "Product created successfully",
        data: {
            id: 1,
            name: 'Sari Beras',
            price: 5000
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