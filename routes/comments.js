
const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.get('/', commentsCtrl.index);
router.get('/new', commentsCtrl.new);
router.get('/:id', commentsCtrl.show);
router.post('/posts/:id', commentsCtrl.create);
router.delete('/comments/:id', commentsCtrl.delete);
router.get('/comments/:id/edit', commentsCtrl.edit);
router.put('/comments/:id', commentsCtrl.update);

module.exports = router;