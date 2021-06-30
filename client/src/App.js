import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Feed } from './Posts';
import { Post } from './Post';
import { SignIn, SignUp } from './Login';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
