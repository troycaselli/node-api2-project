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
        const {title, contents} = req.body;
        if(!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            const newPostId = await Posts.insert(req.body);
            const newPost = await Posts.findById(newPostId.id);
            res.status(201).json(newPost);
        }
    } catch(err) {
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {title, contents} = req.body;
        if(!await Posts.findById(id)) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else if(!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            await Posts.update(id, {title, contents});
            const updatedPost = await Posts.findById(id);
            res.status(200).json(updatedPost);
        }
    } catch(err) {
        res.status(500).json({
            message: "The post information could not be modified"
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const postToDelete = await Posts.findById(id);
        if(!postToDelete) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            await Posts.remove(id);
            res.status(200).json(postToDelete);
        }
    } catch(err) {
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const {id} = req.params;
        const found = await Posts.findById(id);
        if(!found) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const comments = await Posts.findPostComments(id);
            console.log(comments);
            res.status(200).json(comments);
        }
    } catch(err) {
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    }
})

module.exports = router;

