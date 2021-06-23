const Post = require('../models/post');
const Comment = require('../models/post');
const User = require('../models/user');
const comments = require('./comments');
const { post } = require('../server');
const Like = require('../models/post');

module.exports = {
  index,
  show,
  edit,
  create,
  delete: deletePost,
  update,
  search,
  sortLikes,
  sortComments,
};

function index(req, res) {
  const perPage = 5
  const page = req.params.page || 1
  const sortBy = { createdAt: -1 }

  Post.find({})
  .sort(sortBy)
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
  })
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

function edit(req, res) {
  Post.findById(req.params.id)
  .exec(function(err, post) {
    res.render('posts/edit', {post})
  })
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

  function search(req, res) {
    const regex = new RegExp(req.body.search, "i")
    Post.find(
      {content: {$regex: regex}})
    .populate({
      path: 'author',
      model: 'User'
    })
    .exec(function(err, posts) {
      console.log(posts);
        res.render('posts/search', {posts})
        })
    }


    function sortLikes(req, res) {
      const sortBy = { likes: -1 }
      Post.find({})
      .sort(sortBy)
      .populate({
        path: 'author',
        model: 'User'
      })
      .exec(function(err, posts) {
        console.log(posts);
          res.render('posts/liked', {posts})
          })
      }
      function sortComments(req, res) {
        const sortBy = { comments: -1 }
        Post.find({})
        .sort(sortBy)
        .populate({
          path: 'author',
          model: 'User'
        })
        .exec(function(err, posts) {
          console.log(posts);
            res.render('posts/commented', {posts})
            })
        }
    