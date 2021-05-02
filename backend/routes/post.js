const express = require('express');
const router =express.Router();
const posts = require('../controllers/posts')

//domain.name/posts/
router.get('/',posts.getPosts);
router.post('/',posts.createPost);

module.exports = router;