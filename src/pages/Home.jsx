import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./pagestyles/Home.css";
import { useEffect, useRef, useState } from "react";
import { Play, Brain, Scissors, MessageSquare, ChevronRight, ArrowRight, Globe, Music } from "lucide-react";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Transform your videos with cutting-edge AI analysis that understands context, content, and meaning",
      bgShape: "circle"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Smart Clip Extraction",
      description: "Extract the perfect moments automatically with our intelligent scene detection technology",
      bgShape: "hexagon"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Interactive Insights",
      description: "Have natural conversations about your video content with our advanced AI assistant",
      bgShape: "square"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Video Translation",
      description: "Instantly translate your videos into multiple languages with our advanced AI translation technology",
      bgShape: "triangle"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Audio Extraction",
      description: "Extract high-quality audio from your videos with precision and clarity",
      bgShape: "pentagon"
    }
  ];

  const teamMembers = [
    {
      name: "Keerthana Adla",
      email: "kirthanadla@gmail.com",
      role: "Developer",
      social: "https://github.com/Adla-Keerthana",
      
    },
    {
      name: "Amuktha Malyada Gaje",
      email: "amukthagaje@gmail.com",
      role: "Developer",
      social: "https://github.com/AmukthaMalyadaGaje",
      
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Next Generation Video Intelligence
              </div>
              <h1 className="hero-title">
                Transform Your <span className="gradient-text">Videos</span>
                <br />With AI <span className="gradient-text">Intelligence</span>
              </h1>
              <p className="hero-subtitle">
                Experience the future of video analysis with advanced AI technology.
                Understand, extract, translate, and interact with your content like never before.
              </p>
              <div className="hero-cta">
                <Link to="/analyzer" className="cta-primary">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a href="#features" className="cta-secondary">
                  See Features
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-container">
                <div className="floating-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
                <div className="demo-video">
                  {/* Replace with your demo video */}
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="rounded-video"
                  >
                    <source src="/demo.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${index === activeFeature ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`feature-icon ${feature.bgShape}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <ChevronRight className="feature-arrow" />
              </div>
            ))}
          </div>
        </section>

        
        
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="member-box">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                
                <p className="member-email">
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </p>
                <a href={member.social} className="github-link" target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p>© 2024 VideoGPT - Revolutionizing video understanding with artificial intelligence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;