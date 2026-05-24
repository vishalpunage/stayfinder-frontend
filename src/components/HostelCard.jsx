import { useState } from "react";

export default function HostelCard({ hostel, liked, onLike, onView }) {
  const [hovered, setHovered] = useState(false);

  const amenityIcons = {
    "WiFi": "📶",
    "Food": "🍽️",
    "AC": "❄️",
    "Parking": "🅿️",
    "Gym": "💪",
    "Laundry": "👕",
    "Security": "🔒",
  };

  const amenityList = hostel.amenities?.split(",").map((a) => a.trim()) || [];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: hovered ? "0 20px 50px rgba(37,99,235,0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={hostel.image_url}
          alt={hostel.hostel_name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Type Badge */}
        <div style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          background: hostel.type === "PG" ? "#16a34a" : "#2563eb",
          color: "white",
          padding: "5px 12px",
          borderRadius: "50px",
          fontSize: "11px",
          fontWeight: "800",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}>
          {hostel.type}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onLike(); }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(255,255,255,0.95)",
            border: "none",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
            transform: liked ? "scale(1.15)" : "scale(1)",
          }}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "18px" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "18px",
          margin: "0 0 6px",
          color: "#0f172a",
        }}>
          {hostel.hostel_name}
        </h3>

        <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 10px" }}>
          📍 {hostel.location}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <span style={{ color: "#f59e0b", fontSize: "14px" }}>★</span>
          <span style={{ fontWeight: "700", fontSize: "14px", color: "#0f172a" }}>{hostel.rating}</span>
          <span style={{ color: "#94a3b8", fontSize: "12px" }}>/ 5.0</span>
        </div>

        {/* Amenities */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
          {amenityList.slice(0, 4).map((a) => (
            <span key={a} style={{
              background: "#f1f5f9",
              color: "#475569",
              padding: "4px 10px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "600",
            }}>
              {amenityIcons[a] || "✓"} {a}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: "800", fontSize: "20px", color: "#2563eb", fontFamily: "'Playfair Display', serif" }}>
              {hostel.price}
            </span>
          </div>
          <button
            onClick={onView}
            style={{
              background: hovered ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#eff6ff",
              color: hovered ? "white" : "#2563eb",
              border: "none",
              padding: "9px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "13px",
              transition: "all 0.3s",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
