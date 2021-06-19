
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/', postsCtrl.index);
router.get('/new', postsCtrl.new);
router.get('/:id', postsCtrl.show);
router.post('/', postsCtrl.create);


module.exports = router;