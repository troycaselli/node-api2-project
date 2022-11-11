// implement your posts router here
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'router server response'
    });
})

module.exports = router;