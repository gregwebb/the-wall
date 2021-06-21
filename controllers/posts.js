const Post = require('../models/post');
const Comment = require('../models/post');
const User = require('../models/user');
const comments = require('./comments');
const { post } = require('../server');
const Like = require('../models/post');

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
  const perPage = 5
  const page = req.params.page || 1

  Post.find({})
  .populate({
    path: 'author',
    model: 'User'
  })
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec(function(err, posts) {
    Post.count().exec(function(err, count) {
      if (err) return next(err)
      res.render('posts/index', {
        posts, page, pages: Math.ceil(count / perPage)})
      })
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


  async function deletePost (req, res) {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/posts')
    } catch (err) {
        res.send(err)
    }
}


function deletePost(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (post.author._id.equals(req.user._id)) { 
      post.remove(function(err) {
        res.redirect('/posts');
    });
    } else {
      res.redirect(`/posts/${post._id}`)
  }
  });
}


function edit(req, res) {
  Post.findById(req.params.id, function(err, post) {
    res.render('posts/edit', {post});
  });
}


function update(req, res) {
  Post.findById(req.params.id, function(err, post) {
    post.content = req.body.content;
    if (post.author._id.equals(req.user._id)) { 
      post.save(function(err) {
      res.redirect(`/posts/${post._id}`)
    });
    } else {
      res.redirect(`/posts/${post._id}`)
  }
  });
}
