import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/video-summarization', label: 'Video Summarization' },
    { path: '/video-clip-extraction', label: 'Video Clip Extraction' },
    { path: '/video-qa', label: 'Video QA' } // Added Video QA route
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate('/')}>📽️ VideoGPT</div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <button
              key={index}
              className="nav-link"
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="navbar-mobile-toggle" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(10, 25, 47, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          box-shadow: var(--shadow-sm);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 700;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          margin-left: auto;
        }

        .nav-link {
          color: var(--text-primary);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          background: var(--gradient-primary);
          transform: translateY(-2px);
        }

        .navbar-mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }

        .hamburger-line {
          display: block;
          width: 25px;
          height: 3px;
          background: white;
          margin: 5px 0;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 60px;
            right: 0;
            background: rgba(10, 25, 47, 0.95);
            width: 200px;
            padding: 15px;
            border-radius: 8px;
          }

          .nav-links.active {
            display: flex;
          }

          .navbar-mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
