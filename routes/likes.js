
const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes');

router.post('/posts/:id/like', likesCtrl.create);

module.exports = router;