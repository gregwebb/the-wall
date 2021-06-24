const Comment = require("../models/post");
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/post");
const { post } = require("../routes");

module.exports = {
  create: createLike,
};

async function createLike(req, res) {
  const post = Post.findById(req.params.id);
  try {
    await post.updateOne({ $addToSet: { likes: req.user } });
    res.redirect("back");
  } catch (err) {
    res.send(err);
  }
}
