import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ scroll }) => {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('name'));
  }, []);

  const logout = () => {
    localStorage.removeItem('name');
    window.location.reload();
  };

  const scrollToTop = () => {
    if (scroll) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={scrollToTop}>
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

              {loggedIn && <button onClick={logout}>Logout</button>}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};
