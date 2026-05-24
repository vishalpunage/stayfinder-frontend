export default function Navbar({ user, onLogin, onLogout }) {
  return (
    <nav style={{
      background: "white",
      padding: "18px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        color: "#2563eb",
        fontSize: "26px",
        margin: 0,
        letterSpacing: "-0.5px",
      }}>
        🏠 StayFinder
      </h1>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        {["Home", "Hostels", "Contact"].map((link) => (
          <a key={link} href="#" style={{
            textDecoration: "none",
            color: "#475569",
            fontWeight: "600",
            fontSize: "15px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.color = "#2563eb"}
          onMouseLeave={(e) => e.target.style.color = "#475569"}
          >
            {link}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (
          <>
            <span style={{ color: "#475569", fontWeight: "600", fontSize: "15px" }}>
              👋 {user.name.split(" ")[0]}
            </span>
            <button onClick={onLogout} style={{
              background: "transparent",
              color: "#ef4444",
              border: "2px solid #ef4444",
              padding: "8px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "14px",
            }}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={onLogin} style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "15px",
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
          }}>
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}
