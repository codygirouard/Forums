import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="#!">
              <i className="fas fa-home"></i>
            </a>
          </li>
          <li>
            <a href="#!">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Post = ({ author, title, commentCount, likes }) => {
  return (
    <div className="post">
      <div className="postContents">
        <h3 className="postTitle">
          {author}: {title}
        </h3>
        <p className="postComments">{commentCount} comments</p>
      </div>
      <p className="postLikes">
        <i className="far fa-thumbs-up"> {likes}</i>
      </p>
    </div>
  );
};

const Posts = ({ page }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('https://cors-demo.glitch.me/allow-cors', { mode: 'cors' });
  }, []);
  return (
    <div className="posts">
      <Post author="coudei" title="First post" commentCount="2" likes="4" />
    </div>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Posts page="1" />
    </>
  );
};

export default App;
