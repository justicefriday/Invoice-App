
import { useTheme } from "../context/ThemeContext";

// ── Sun icon (light mode indicator) ──
function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="4" stroke="#858BB2" strokeWidth="1.5"/>
      <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.22 3.22l1.42 1.42M15.36 15.36l1.42 1.42M3.22 16.78l1.42-1.42M15.36 4.64l1.42-1.42"
        stroke="#858BB2" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// ── Moon icon (dark mode indicator) ──
function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17.5 10.79A7.5 7.5 0 1 1 9.21 2.5a5.83 5.83 0 0 0 8.29 8.29z"
        fill="#858BB2"/>
    </svg>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        background:    "#373B53",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"space-between",
        zIndex:        100,
        position:      "sticky",
        top:           0,
      }}
      // Desktop: left sidebar. Mobile: top bar.
    >
      {/* ── Logo ── */}
      <div
        style={{
          width:          "72px",
          height:         "72px",
          background:     "var(--purple)",
          borderRadius:   "0 20px 20px 0",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
          position:       "relative",
          overflow:       "hidden",
        }}
        aria-label="Invoice app logo"
      >
        {/* Bottom half accent */}
        <div
          style={{
            position:   "absolute",
            bottom:     0, left: 0, right: 0,
            height:     "50%",
            background: "var(--purple-light)",
            borderRadius: "20px 0 0 0",
          }}
          aria-hidden="true"
        />
        {/* White letter mark */}
        <span style={{ color: "#fff", fontWeight: 700, fontSize: "20px", zIndex: 1 }}>
          F
        </span>
      </div>

      {/* ── Right side: theme toggle + avatar ── */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          style={{
            background: "transparent",
            border:     "none",
            padding:    "24px",
            display:    "flex",
            alignItems: "center",
          }}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>

        {/* Divider */}
        <div style={{ width: "1px", height: "72px", background: "#494E6E" }} aria-hidden="true" />

        {/* Avatar */}
        <div
          style={{
            width:          "32px",
            height:         "32px",
            borderRadius:   "50%",
            background:     "#9277FF",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          "#fff",
            fontWeight:     700,
            fontSize:       "12px",
            margin:         "0 24px",
            flexShrink:     0,
          }}
          aria-label="User avatar"
        >
          U
        </div>
      </div>
    </header>
  );
}