// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find()
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch(() => {
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if(!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(post);
        }
    } catch(err) {
        res.status(500).json({
            message: "The post information could not be retrieved"
        })
    }
});

router.post('/', async (req, res) => {
    try {
        throw new Error();
    } catch(err) {
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    }
})

// throw new Error();

module.exports = router;