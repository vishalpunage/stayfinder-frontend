const LOCATIONS = ["All", "Bangalore", "Chennai", "Mysore", "Hyderabad", "Pune", "Manipal", "Delhi", "Mumbai", "Coimbatore", "Vellore"];

export default function Hero({ search, setSearch, location, setLocation, typeFilter, setTypeFilter }) {
  return (
    <section style={{
      minHeight: "88vh",
      backgroundImage: "url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1600&auto=format&fit=crop')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "white",
      position: "relative",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(37,99,235,0.5) 100%)" }} />

      <div style={{ position: "relative", zIndex: 1, padding: "0 20px", maxWidth: "800px", width: "100%" }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: "6px 18px",
          borderRadius: "50px",
          fontSize: "13px",
          fontWeight: "700",
          letterSpacing: "2px",
          marginBottom: "20px",
          textTransform: "uppercase",
        }}>
          🎓 For Students, By Students
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 6vw, 68px)",
          lineHeight: "1.1",
          marginBottom: "18px",
          fontWeight: "800",
        }}>
          Find Your Perfect
          <br />
          <span style={{ color: "#93c5fd" }}>PG & Hostel</span>
        </h1>

        <p style={{ fontSize: "clamp(16px,2vw,20px)", marginBottom: "40px", opacity: 0.9, fontWeight: "400" }}>
          Smart accommodation search near top colleges across India
        </p>

        {/* Search Bar */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "16px 20px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}>
          <input
            type="text"
            placeholder="🔍  Search by college, name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px 16px",
              flex: "1",
              minWidth: "220px",
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
              fontSize: "15px",
              outline: "none",
              color: "#0f172a",
              fontFamily: "'Nunito', sans-serif",
            }}
          />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
              fontSize: "15px",
              color: "#0f172a",
              fontFamily: "'Nunito', sans-serif",
              background: "white",
              cursor: "pointer",
            }}
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc === "All" ? "📍 All Cities" : loc}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
              fontSize: "15px",
              color: "#0f172a",
              fontFamily: "'Nunito', sans-serif",
              background: "white",
              cursor: "pointer",
            }}
          >
            <option value="All">🏠 All Types</option>
            <option value="HOSTEL">🏨 Hostel</option>
            <option value="PG">🏡 PG</option>
          </select>

          <button
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              border: "none",
              padding: "12px 28px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "800",
              fontFamily: "'Nunito', sans-serif",
              boxShadow: "0 4px 15px rgba(37,99,235,0.4)",
            }}
          >
            Search
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "40px", flexWrap: "wrap" }}>
          {[["14+", "Hostels & PGs"], ["10", "Cities"], ["500+", "Happy Students"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontSize: "28px", fontWeight: "900", fontFamily: "'Playfair Display', serif" }}>{num}</div>
              <div style={{ fontSize: "13px", opacity: 0.8, fontWeight: "600" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
