const Comment = require("../models/post");
const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
  index,
  create,
  delete: deleteComment,
  update,
};

function index(req, res) {
  Comment.find({}, function (err, comments) {
    res.render("comments/index", { title: "All Comments", comments });
  });
}

async function create(req, res) {
  const comment = new Comment(req.body);
  try {
    const post = await Post.findById(req.params.id);
    comment.author = req.user._id;
    post.comments.push(comment);
    post.save();
    res.redirect(`/posts/${post._id}`);
  } catch (err) {
    res.send(err);
  }
}

function deleteComment(req, res) {
  Post.findOne({ "comments._id": req.params.id }, function (err, post) {
    const commentSubdoc = post.comments.id(req.params.id);
    commentSubdoc.remove();
    post.save(function (err) {
      res.redirect(`/posts/${post._id}`);
    });
  });
}

function update(req, res) {
  Post.findById(req.params.id, function (err, post) {
    post.content = req.body.content;
    if (post.author._id.equals(req.user._id)) {
      post.save(function (err) {
        res.redirect(`/posts/${post._id}`);
      });
    } else {
      res.redirect(`/posts/${post._id}`);
    }
  });
}
