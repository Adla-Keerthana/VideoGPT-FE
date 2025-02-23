import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <style>
        {`
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(12, 16, 58, 0.95); /* Updated to a suitable shade of blue */
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 40px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
            z-index: 1000;
          }

          .navbar-logo {
            font-size: 22px;
            font-weight: bold;
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .logo-icon {
            font-size: 24px;
          }

          .nav-links {
            display: flex;
            gap: 20px;
          }

          .nav-link {
            text-decoration: none;
            color: white;
            font-size: 16px;
            font-weight: 600;
            background: var(--accent-blue, #4f46e5);
            padding: 10px 20px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }

          .nav-link:hover {
            background: #3b3bb3;
            transform: scale(1.05);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .navbar {
              flex-direction: column;
              align-items: center;
              padding: 15px 20px;
            }
            
            .nav-links {
              margin-top: 10px;
              gap: 15px;
            }
            
            .nav-link {
              padding: 8px 16px;
              font-size: 14px;
            }
          }
        `}
      </style>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">📽️</span> VideoGPT
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/analyzer" className="nav-link">
            Video Analyzer
          </Link>
          <Link to="/extractor" className="nav-link">
            Video Extractor
          </Link>
          <Link to="/qa" className="nav-link">
            Video Q&A
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;