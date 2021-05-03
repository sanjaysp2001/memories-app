const express = require('express');
const router =express.Router();
const posts = require('../controllers/posts')

//domain.name/posts/
router.get('/',posts.getPosts);
router.post('/',posts.createPost);
router.patch('/:id',posts.updatePost);

module.exports = router;