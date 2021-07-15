import { Link } from 'react-router-dom';
import Header from './header';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="errorNotFound">
        <h1>404</h1>
        <p>Sorry, we couldn't find that page!</p>
        <Link to="/">Return Home</Link>
      </div>
    </>
  );
};

export default NotFound;
