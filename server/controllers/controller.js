import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema, PostSchema } from '../models/model';

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

export const addNewUser = (req, res) => {
  const { pwd, name, email } = req.body;
  const saltRounds = 10;

  bcrypt.hash(pwd, saltRounds, (err, pass_hash) => {
    if (err) {
      return res.send(err);
    }

    const info = {
      name,
      email,
      pass_hash,
    };
    const newUser = new User(info);

    newUser.save((err, user) => {
      if (err) {
        return res.send(err);
      }
      res.json(user);
    });
  });
};

export const verifyUser = (req, res) => {
  const { pwd, username } = req.body;

  User.findOne(
    { $or: [{ name: username }, { email: username }] },
    function (err, user) {
      if (err) {
        return res.send(err);
      } else if (!user) {
        return res.json({ err: 'No user found!' });
      }

      bcrypt.compare(pwd, user.pass_hash, (err, result) => {
        if (err) {
          return res.send(err);
        }
        if (result) {
          res.json({ succ: 'Correct password!' });
        } else {
          res.json({ err: 'Incorrect password!' });
        }
      });
    }
  );
};

export const makePost = (req, res) => {
  const { author, title, body } = req.body;

  const info = {
    author,
    title,
    body,
  };
  const newPost = new Post(info);

  newPost.save((err, post) => {
    if (err) {
      return res.send(err);
    }
    res.json(post);
  });
};

export const makeComment = (req, res) => {
  const { postId, author, body } = req.body;

  const comment = {
    author,
    body,
  };

  Post.findByIdAndUpdate(
    postId,
    { $push: { comments: comment }, $inc: { commentCount: 1 } },
    (err, post) => {
      if (err) {
        return res.send(err);
      }
      res.json({ succ: 'New comment posted!' });
    }
  );
};

export const makeReply = (req, res) => {
  const { postId, commentId, author, body } = req.body;

  const reply = {
    author,
    body,
  };

  Post.updateOne(
    { _id: postId, 'comments._id': commentId },
    { $push: { 'comments.$.replies': reply }, $inc: { commentCount: 1 } },
    (err, post) => {
      if (err) {
        return res.send(err);
      }
      res.json({ succ: 'New reply posted!' });
    }
  );
};

export const getPosts = (req, res) => {
  const page = req.params.page || 1;
  const numPage = Math.max(0, Number(page) - 1);
  Post.find(
    {},
    null,
    {
      sort: '-date',
      limit: 15,
      skip: numPage * 15,
      select: { _id: 1, author: 1, title: 1, commentCount: 1, likes: 1 },
    },
    (err, post) => {
      if (err) {
        return res.send(err);
      } else if (post.length == 0) {
        return res.json({ err: 'No posts found!' });
      }
      res.json(post);
    }
  );
};

export const getPost = (req, res) => {
  const id = req.params.id;
  Post.findById(id, (err, post) => {
    if (err) {
      return res.send(err);
    }
    res.json(post);
  });
};
