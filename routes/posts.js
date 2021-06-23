
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/page/:page', postsCtrl.index);
router.get('/', postsCtrl.index);
router.get('/:id', postsCtrl.show);
router.get('/:id/edit', postsCtrl.edit);
router.post('/', postsCtrl.create);
router.delete('/:id', postsCtrl.delete);
router.put('/:id', postsCtrl.update)
router.post('/search/', postsCtrl.search);
router.post('/liked/', postsCtrl.sortLikes);
router.post('/commented/', postsCtrl.sortComments);

module.exports = router;