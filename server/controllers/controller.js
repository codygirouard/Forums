import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserSchema, PostSchema } from '../models/model';

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

export const addNewUser = async (req, res) => {
  // verify all body parameters are received
  const { pwd, name, email } = req.body;
  if (!pwd || !name || !email) {
    return res.json({
      err: `Password: ${pwd ? 'found' : 'missing'}, username: ${
        name ? 'found' : 'missing'
      }, email: ${email ? 'found' : 'missing'}`,
    });
  }

  const saltRounds = 10;

  const existingUser = await User.findOne({
    $or: [{ name: name }, { email: email }],
  });

  // error user already exists
  if (existingUser) {
    if (existingUser.name === name && existingUser.email === email) {
      return res.json({ err: 'Username and email taken' });
    } else if (existingUser.name === name) {
      return res.json({ err: 'Username taken' });
    } else {
      return res.json({ err: 'Email taken' });
    }
  }

  // create user account
  bcrypt.hash(pwd, saltRounds, (err, pass_hash) => {
    if (err) {
      return res.json({ err: err });
    }

    const info = {
      name,
      email,
      pass_hash,
    };
    const newUser = new User(info);

    newUser.save((err, user) => {
      if (err) {
        return res.json({ err: err });
      }
      res.json({ succ: name });
    });
  });
};

export const userLogin = (req, res) => {
  // verify all body parameters are received
  const { pwd, username } = req.body;
  if (!pwd || !username) {
    return res.json({
      err: `Password: ${pwd ? 'found' : 'missing'}, username: ${
        username ? 'found' : 'missing'
      }`,
    });
  }

  User.findOne(
    { $or: [{ name: username }, { email: username }] },
    function (err, user) {
      // wrong user
      if (err) {
        return res.json({ err });
      } else if (!user) {
        return res.json({ err: 'No user found!' });
      }

      // correct user
      bcrypt.compare(pwd, user.pass_hash, (err, result) => {
        if (err) {
          return res.json({ err });
        }
        if (result) {
          // correct pass
          res.json({ succ: user.name });
        } else {
          // wrong pass
          res.json({ err: 'Incorrect password!' });
        }
      });
    }
  );
};

export const makePost = (req, res) => {
  // verify all body parameters are received
  const { author, title, body } = req.body;
  if (!author || !title || !body) {
    return res.json({
      err: `Author: ${author ? 'found' : 'missing'}, title: ${
        title ? 'found' : 'missing'
      }, body: ${body ? 'found' : 'missing'}`,
    });
  }

  const info = {
    author,
    title,
    body,
  };
  const newPost = new Post(info);

  newPost.save((err) => {
    if (err) {
      return res.json({ err });
    }
    res.json({ succ: 'Posted' });
  });
};

export const makeComment = (req, res) => {
  // verify all body parameters are received
  const { postId, author, body } = req.body;
  if (!postId || !author || !body) {
    return res.json({
      err: `PostID: ${postId ? 'found' : 'missing'}, author: ${
        author ? 'found' : 'missing'
      }, body: ${body ? 'found' : 'missing'}`,
    });
  }

  const comment = {
    author,
    body,
  };

  Post.findByIdAndUpdate(
    postId,
    { $push: { comments: comment }, $inc: { commentCount: 1 } },
    { new: true },
    (err, post) => {
      if (err) {
        return res.json({ err });
      }
      res.json({ succ: 'New comment posted!', result: post });
    }
  );
};

export const makeReply = (req, res) => {
  // verify all body parameters are received
  const { postId, commentId, author, body } = req.body;
  if (!postId || !commentId || !author || !body) {
    return res.json({
      err: `PostID: ${postId ? 'found' : 'missing'}, commentID: ${
        commentId ? 'found' : 'missing'
      }, author: ${author ? 'found' : 'missing'}, body: ${
        body ? 'found' : 'missing'
      }`,
    });
  }

  const reply = {
    author,
    body,
  };

  Post.updateOne(
    { _id: postId, 'comments._id': commentId },
    { $push: { 'comments.$.replies': reply }, $inc: { commentCount: 1 } },
    (err) => {
      if (err) {
        return res.json({ err });
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
      select: {
        _id: 1,
        author: 1,
        title: 1,
        commentCount: 1,
        likes: 1,
        usersLiked: 1,
        date: 1,
      },
    },
    (err, post) => {
      if (err) {
        return res.json({ err });
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
      return res.json({ err });
    }
    res.json(post);
  });
};

export const likePost = (req, res) => {
  // verify all body parameters are received
  const { postId, username } = req.body;
  if (!postId || !username) {
    return res.json({
      err: `PostID: ${postId ? 'found' : 'missing'}, username: ${
        username ? 'found' : 'missing'
      }`,
    });
  }

  Post.findByIdAndUpdate(
    postId,
    { $push: { usersLiked: username }, $inc: { likes: 1 } },
    (err) => {
      if (err) {
        return res.json({ err });
      }
      res.json({ succ: 'Liked post!' });
    }
  );
};

export const unlikePost = (req, res) => {
  // verify all body parameters are received
  const { postId, username } = req.body;
  if (!postId || !username) {
    return res.json({
      err: `PostID: ${postId ? 'found' : 'missing'}, username: ${
        username ? 'found' : 'missing'
      }`,
    });
  }

  Post.findByIdAndUpdate(
    postId,
    { $pullAll: { usersLiked: [username] }, $inc: { likes: -1 } },
    (err) => {
      if (err) {
        return res.json({ err });
      }
      res.json({ succ: 'Unliked post!' });
    }
  );
};
