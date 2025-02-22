import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/video-summarization', label: 'Video Summarization' },
    { path: '/video-clip-extraction', label: 'Video Clip Extraction' },
    { path: '/video-bot', label: 'Video Bot' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          VideoAI
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="navbar-mobile-toggle" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <button
              key={index}
              className="navbar-link"
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;