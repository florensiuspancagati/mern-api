const express = require('express');
const app = express();

app.use(() => {
    console.log('Middleware executed');
    console.log('Middleware executed');
    console.log('asdfak;djf;akjfa;sd');
})
app.listen(3000);

