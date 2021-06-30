// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-home"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const SignIn = () => {
  return (
    <div className="centerScreen">
      <Header />
      <div className="loginContainer">
        <form>
          <label for="username">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            required
          />

          <label for="pwd">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="pwd"
            required
          />

          <button>Login</button>
        </form>
        <div className="swapLogin">
          <p>
            Don't have an account? <Link to="/register">Sign up here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const SignUp = () => {
  return (
    <div className="centerScreen">
      <Header />
      <div className="loginContainer">
        <form>
          <label for="username">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            required
          />

          <label for="email">Email</label>
          <input type="text" placeholder="Enter email" name="email" required />

          <label for="pwd">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="pwd"
            required
          />

          <button>Login</button>
        </form>
        <div className="swapLogin">
          <p>
            Already have an account? <Link to="/login">Sign in here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
