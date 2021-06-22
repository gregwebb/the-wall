const Comment = require('../models/post');
const User = require('../models/user');
const Post = require('../models/post');
const Like = require('../models/post');
const { post } = require('../routes');
const comment = require('../../the-wall/models/comment');

module.exports = {
  
  create: createCommentLike,
  create: createLike,
};



async function createLike(req, res) {
  const post = Post.findById(req.params.id);
  try {
      await post.updateOne({ $addToSet: { likes: req.user } });
      res.redirect('back')
  } catch (err) {
      res.send(err)
  }   
}


async function createCommentLike(req, res) {
const post = Post.findOne({'comment._id': req.params.id})
try {
  await post.updateOne(
    {_id: post._id,"comments._id": req.params.id}
    ,{ $addToSet: {"comments.$.likes" : req.user }}
    );
  res.redirect('back')
} catch (err) {
  res.send(err)
}   
}

  