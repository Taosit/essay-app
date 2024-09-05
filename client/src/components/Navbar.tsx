import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  return (
    <nav>
      <div className="nav-content">
        {isHomeRoute ? (
          <div style={{ userSelect: "none" }}>Essay App</div>
        ) : (
          <a href="/" className="navigation-button">
            All Essays
          </a>
        )}
      </div>
    </nav>
  );
};
