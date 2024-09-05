import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <nav>
      <div className="nav-content">
        {isHomeRoute ? (
          <div className="nav-text">
            <span className="app-name">Essay App</span>{" "}
            <span>Easily write and correct essays</span>
          </div>
        ) : (
          <a href="/" className="navigation-button">
            All Essays
          </a>
        )}
      </div>
    </nav>
  );
};
