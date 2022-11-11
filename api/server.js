// implement your server here
const express = require('express');

// require your posts router and connect it here
const postsRouter = require('./posts/posts-router');

const server = express();

server.use('/api/posts', postsRouter);
server.use('/', (req, res) => {
    res.status(200).json({
        message: 'standard server response'
    });
});

module.exports = server;