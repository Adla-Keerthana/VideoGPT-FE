import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoAnalyzer from './pages/VideoAnalyzer';
import VideoExtractor from './pages/VideoExtractor';
import VideoQA from './pages/VideoQA';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="gradient-background"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          
           <Route path="/analyzer" element={<VideoAnalyzer />} />
          <Route path="/extractor" element={<VideoExtractor />} />
          <Route path="/qa" element={<VideoQA />} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

