
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  likedBy: {type: Schema.Types.ObjectId, ref: 'User'},
}
);

const commentSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps: true
  }
);

const postSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [commentSchema],
  likes: [likeSchema]
}, {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);