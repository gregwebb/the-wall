
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

router.get('/page/:page', postsCtrl.index);
router.get('/', postsCtrl.index);
router.get('/new', postsCtrl.new);
router.get('/:id', postsCtrl.show);
router.post('/', postsCtrl.create);
router.delete('/:id', postsCtrl.delete);
router.get('/:id/edit', postsCtrl.edit);
router.put('/:id', postsCtrl.update)


module.exports = router;