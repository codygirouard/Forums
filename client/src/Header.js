import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ posts }) => {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('name'));
  }, []);

  const handleClick = () => {
    setLoggedIn(false);
    localStorage.removeItem('name');
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-home"></i>
            </Link>
          </li>
          <li className="dropdown">
            <button className="dropdownBtn">Account</button>
            <div className="dropdownContent">
              {!loggedIn && (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}

              {loggedIn && <button onClick={handleClick}>Logout</button>}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};
