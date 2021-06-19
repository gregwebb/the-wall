const Comment = require('../models/post');
const User = require('../models/user');
const Post = require('../models/post');



module.exports = {
  index,
  show,
  new: newComment,
  create
};

function index(req, res) {
  Comment.find({}, function(err, comments) {
    res.render('comments/index', { title: 'All Comments', comments });
  });
}

function show(req, res) {

}

function newComment(req, res) {
  res.render('comments/new', { title: 'Add Comment' });
}




async function create(req, res) {
  const comment = new Comment(req.body);
  try {
      const post = await Post.findById(req.params.id);
      comment.author = req.user._id;
      post.comments.push(comment);
      post.save();
      res.redirect(`/posts/${post._id}`)
  } catch (err) {
      res.send(err)
  }   
}