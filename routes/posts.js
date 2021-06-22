
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/page/:page', postsCtrl.index);
router.get('/', postsCtrl.index);
router.get('/:id', postsCtrl.show);
router.post('/', postsCtrl.create);
router.delete('/:id', postsCtrl.delete);
router.put('/:id', postsCtrl.update)
router.get('/posts', postsCtrl.search);

module.exports = router;