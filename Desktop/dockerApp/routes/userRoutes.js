const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.posts('/signup', authController.signUp);

module.exports = router;