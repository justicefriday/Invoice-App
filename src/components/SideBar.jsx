import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo" aria-label="Logo">
          <span>W</span>
        </div>
      </div>

      <div className="sidebar-bottom">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="sidebar-divider" />

        <img
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          className="avatar"
        />
      </div>
    </aside>
  );
};

export default Sidebar;