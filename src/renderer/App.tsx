import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './css/main.css';
import Main from './components/main';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
