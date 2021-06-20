const Post = require('../models/post');
const Comment = require('../models/post');
const User = require('../models/user');
const comments = require('./comments');
const { post } = require('../server');

module.exports = {
  index,
  show,
  new: newPost,
  create,
  delete: deletePost,
  edit,
  update
};

function index(req, res) {
  Post.find({})
  .populate({
    path: 'author',
    model: 'User'
  }).exec(function(err, posts) {
    res.render('posts/index', {posts})
  })
}




function show(req, res) {
  Post.findById(req.params.id)
  .populate({
    path: 'author',
    model: 'User'
  })
  .populate({
    path: 'comments.author',
    model: 'User'
  })
  .exec(function(err, post) {
    res.render('posts/show', {post})
    console.log(post)
  })
}

  


function newPost(req, res) {
  res.render('posts/new', { title: 'Add Post' });
}

function create(req, res) {
  const post = new Post(req.body);
  post.author = req.user._id;
  post.save(function(err) {
    if (err) return res.redirect('/posts/new');
    res.redirect(`/posts/${post._id}`);
    console.log(post);
  });
}

function deletePost (req, res) {
  Post.findByIdAndDelete(req.params.id)
      res.redirect('/posts')
  }


  async function deletePost (req, res) {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/posts')
    } catch (err) {
        res.send(err)
    }
}

function edit(req, res) {
  Post.findById(req.params.id, function(err, post) {
    res.render('posts/edit', {post});
  });
}


function update(req, res) {
  Post.findById(req.params.id, function(err, post) {
    post.content = req.body.content;
    post.save(function(err) {
      res.redirect(`/posts/${post._id}`);
    });
  });
}