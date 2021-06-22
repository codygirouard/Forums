import React from 'react';
import './App.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="#!">
              <i class="fas fa-home"></i>
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

const Post = () => {
  return (
    <div className="post">
      <p>coudei: This is my first post.</p>
      <p>13 comments</p>
      <p>3 likes</p>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Post />
    </>
  );
};

export default App;
