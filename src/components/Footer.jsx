export default function Footer() {
  return (
    <footer style={{
      background: "#0f172a",
      color: "white",
      padding: "50px 5% 30px",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#93c5fd", marginBottom: "12px" }}>🏠 StayFinder</h3>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.7" }}>
            Helping students find safe and affordable hostels & PGs near their colleges across India.
          </p>
        </div>
        <div>
          <h4 style={{ fontWeight: "800", marginBottom: "14px", color: "white" }}>Quick Links</h4>
          {["Home", "Hostels", "PGs", "Contact Us"].map((l) => (
            <a key={l} href="#" style={{ display: "block", color: "#94a3b8", textDecoration: "none", fontSize: "14px", marginBottom: "8px" }}>{l}</a>
          ))}
        </div>
        <div>
          <h4 style={{ fontWeight: "800", marginBottom: "14px", color: "white" }}>Cities</h4>
          {["Bangalore", "Chennai", "Hyderabad", "Pune", "Delhi", "Mumbai"].map((c) => (
            <a key={c} href="#" style={{ display: "block", color: "#94a3b8", textDecoration: "none", fontSize: "14px", marginBottom: "8px" }}>{c}</a>
          ))}
        </div>
        <div>
          <h4 style={{ fontWeight: "800", marginBottom: "14px", color: "white" }}>Tech Stack</h4>
          {["React.js", "Node.js + Express", "MySQL", "JWT Auth"].map((t) => (
            <span key={t} style={{ display: "inline-block", background: "#1e293b", color: "#93c5fd", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", margin: "0 6px 6px 0", fontWeight: "600" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1e293b", paddingTop: "24px", textAlign: "center", color: "#475569", fontSize: "13px" }}>
        © 2024 StayFinder — DBMS Mini Project | Built with React.js + Node.js + MySQL
      </div>
    </footer>
  );
}
