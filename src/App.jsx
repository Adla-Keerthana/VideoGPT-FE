import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoAnalyzer from './pages/VideoAnalyzer';
import VideoExtractor from './pages/VideoExtractor';
import VideoQA from './pages/VideoQA';
import VideoTranslator from './pages/VideoTranslator';
import AudioExtraction from './pages/AudioExtraction';
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
          <Route path="/translator" element={<VideoTranslator />} />
          <Route path="/audio-extraction" element={<AudioExtraction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;