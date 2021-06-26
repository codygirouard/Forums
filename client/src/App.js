import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Feed } from './Posts';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/:id" element={<Feed isPost={true} />} />
      </Routes>
    </>
  );
};

export default App;
