
const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.get('/', commentsCtrl.index);
router.get('/new', commentsCtrl.new);
router.get('/:id', commentsCtrl.show);
router.post('/posts/:id', commentsCtrl.create);

module.exports = router;