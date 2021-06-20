const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String

}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);