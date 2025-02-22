import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: "🎥",
      title: "Video Analysis",
      description: "Advanced AI-powered video content analysis with detailed insights and summaries"
    },
    {
      icon: "✂️",
      title: "Clip Extraction",
      description: "Precise video segment extraction with smart scene detection"
    },
    {
      icon: "🤖",
      title: "Interactive Q&A",
      description: "Natural conversation with your video content through our AI assistant"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span className="logo-icon">📽️</span> VideoGPT
        </div>
        <div className="nav-links">
          <Link to="/analyzer" className="nav-link">Video Analyzer</Link>
          <Link to="/extractor" className="nav-link">Video Extractor</Link>
          <Link to="/qa" className="nav-link">Video Q&A</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content slide-up">
            <h1 className="hero-title">Next-Gen Video Intelligence</h1>
            <p className="hero-subtitle">Transform your video content with AI-powered analysis, extraction, and interaction</p>
            <div className="hero-buttons">
              <Link to="/analyzer" className="primary-button">
                Start Analyzing <span className="button-arrow">→</span>
              </Link>
              <a href="#features" className="secondary-button">
                Learn More <span className="button-arrow">↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <h2 className="section-title">Powerful Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
