const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports = {
  index,
  show,
  new: newUser,
  create
};

function index(req, res) {
    User.find({}, function(err, users) {
      res.render('users/index', { title: 'User List', users });
    });
  }
  
function show(req, res) {

}

function newUser(req, res) {
  res.render('users/new', { title: 'Register' });
}

function create(req, res) {
  const user = new User(req.body);
  user.save(function(err) {
    if (err) return res.redirect('/users/new');
    res.redirect(`/users/${user._id}`);
  });
}