import mongoose from 'mongoose';
const { Schema } = mongoose;

export const UserSchema = new Schema({
  name: String,
  email: String,
  pass_hash: String,
});

export const PostSchema = new Schema({
  author: String,
  title: String,
  likes: { type: Number, default: 0 },
  usersLiked: [String],
  body: String,
  date: { type: Date, default: Date.now },
  commentCount: { type: Number, default: 0 },
  comments: [
    {
      author: String,
      body: String,
      date: { type: Date, default: Date.now },
      replies: [
        {
          author: String,
          body: String,
          date: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});
