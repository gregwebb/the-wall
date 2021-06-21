const Comment = require('../models/post');
const User = require('../models/user');
const Post = require('../models/post');
const Like = require('../models/post');

module.exports = {
  create: createLike,
};



async function createLike(req, res) {
  const post = Post.findById(req.params.id);
  try {
      await post.update({ $addToSet: { likes: req.user } });
      res.redirect('/posts/')
  } catch (err) {
      res.send(err)
  }   
}