import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Feed } from './Posts';
import { Post } from './Post';
import { SignIn, SignUp } from './Login';
import { NewPost } from './NewPost';
import NotFound from './NotFound';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
