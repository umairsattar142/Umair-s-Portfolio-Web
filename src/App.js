import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import ResumePDF from './components/ResumePDF';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/resume" element={<ResumePDF />} />
      </Routes>
    </Router>
  );
}

export default App;
