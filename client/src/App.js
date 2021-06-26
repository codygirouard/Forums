import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Feed } from './Posts';
import { Post } from './Post';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/:id" element={<Post />} />
      </Routes>
    </>
  );
};

export default App;
