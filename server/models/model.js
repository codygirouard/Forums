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
  Likes: { type: Number, default: 0 },
  body: String,
  date: { type: Date, default: Date.now },
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
