const express = require('express');
const userController = require('../controllers/user.controller');
const forumController = require('../controllers/forum.controller');
const categoryController = require('../controllers/category.controller');
const postController = require('../controllers/post.controller');
let router = express.Router();

// User Controller Routes
router.get('/auth/hello', userController().hello);
router.post('/register', userController().register);
router.post('/login', userController().login);

// Forum Controller Routes
router.post('/auth/forum/create', forumController().createForum);

// Category Controller Routes
router.post('/auth/category/create', categoryController().createCategory);

// Post Controller Routes
//router.post('/auth/post/create', postController().createCategory);

module.exports = router;
