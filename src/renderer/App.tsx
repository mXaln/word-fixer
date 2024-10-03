import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './css/main.css';
import Home from './components/home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
