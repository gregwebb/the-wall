
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
router.get('/search/:query', postsCtrl.search);
router.post('/search', postsCtrl.query);

module.exports = router;