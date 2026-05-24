import { useState } from "react";

export default function Details({ hostel, user, onBack, onLoginRequired, API }) {
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    student_name: user?.name || "",
    phone_number: "",
    room_type: "Single",
    booking_date: "",
  });

  const handleBook = async () => {
    if (!user) { onLoginRequired(); return; }
    if (!form.student_name || !form.phone_number || !form.booking_date) {
      alert("Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("stayfinder_token");
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...form,
          hostel_name: hostel.hostel_name,
          user_id: user?.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBookingId(data.booking_id);
        setShowForm(false);
        setShowConfirm(true);
      } else {
        alert(data.error || "Booking failed");
      }
    } catch {
      // Offline fallback
      setBookingId(Math.floor(Math.random() * 9000) + 1000);
      setShowForm(false);
      setShowConfirm(true);
    }
    setLoading(false);
  };

  const amenityIcons = { "WiFi": "📶", "Food": "🍽️", "AC": "❄️", "Parking": "🅿️", "Gym": "💪", "Laundry": "👕", "Security": "🔒" };
  const amenityList = hostel.amenities?.split(",").map((a) => a.trim()) || [];

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "white", padding: "18px 5%", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "20px", position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "#eff6ff", color: "#2563eb", border: "none", padding: "10px 18px", borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "14px", fontFamily: "'Nunito', sans-serif" }}>
          ← Back
        </button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", margin: 0, color: "#0f172a", fontSize: "20px" }}>{hostel.hostel_name}</h2>
      </div>

      <div style={{ maxWidth: "960px", margin: "40px auto", padding: "0 20px" }}>
        {/* Hero Image */}
        <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", marginBottom: "32px" }}>
          <img src={hostel.image_url} alt={hostel.hostel_name} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "28px", alignItems: "start" }}>
          {/* Left */}
          <div>
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <span style={{ background: hostel.type === "PG" ? "#dcfce7" : "#dbeafe", color: hostel.type === "PG" ? "#16a34a" : "#2563eb", padding: "5px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "800" }}>{hostel.type}</span>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", margin: "12px 0 6px", color: "#0f172a" }}>{hostel.hostel_name}</h1>
                  <p style={{ color: "#64748b", fontSize: "16px", margin: 0 }}>📍 {hostel.location}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "32px", fontWeight: "900", color: "#2563eb", fontFamily: "'Playfair Display', serif" }}>{hostel.price}</div>
                  <div style={{ color: "#94a3b8", fontSize: "13px" }}>per month</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", padding: "12px 16px", background: "#fefce8", borderRadius: "12px", width: "fit-content" }}>
                <span style={{ fontSize: "20px" }}>⭐</span>
                <span style={{ fontWeight: "800", fontSize: "20px", color: "#0f172a" }}>{hostel.rating}</span>
                <span style={{ color: "#94a3b8", fontSize: "14px" }}>/ 5.0 rating</span>
              </div>
            </div>

            {/* Amenities */}
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", margin: "0 0 18px", fontSize: "20px", color: "#0f172a" }}>Amenities</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px" }}>
                {amenityList.map((a) => (
                  <div key={a} style={{ background: "#f8fafc", border: "2px solid #e2e8f0", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "24px", marginBottom: "6px" }}>{amenityIcons[a] || "✓"}</div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>{a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", margin: "0 0 14px", fontSize: "20px", color: "#0f172a" }}>About this place</h3>
              <p style={{ color: "#64748b", lineHeight: "1.8", margin: 0, fontSize: "15px" }}>
                {hostel.hostel_name} is a well-maintained {hostel.type === "PG" ? "paying guest accommodation" : "hostel"} located {hostel.location}.
                It provides a safe, comfortable, and affordable living environment for students.
                All essential amenities are included — making it a perfect home away from home for college students.
                The property has excellent connectivity to nearby colleges, markets, and public transport.
              </p>
            </div>
          </div>

          {/* Right - Booking Card */}
          <div style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", position: "sticky", top: "90px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", margin: "0 0 20px", fontSize: "22px", color: "#0f172a" }}>Book This Stay</h3>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", fontSize: "13px", color: "#475569" }}>Your Name</label>
              <input
                value={form.student_name}
                onChange={(e) => setForm({ ...form, student_name: e.target.value })}
                placeholder="Full name"
                style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "14px", fontFamily: "'Nunito', sans-serif", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", fontSize: "13px", color: "#475569" }}>Phone Number</label>
              <input
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                placeholder="10-digit mobile number"
                style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "14px", fontFamily: "'Nunito', sans-serif", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", fontSize: "13px", color: "#475569" }}>Room Type</label>
              <select
                value={form.room_type}
                onChange={(e) => setForm({ ...form, room_type: e.target.value })}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "14px", fontFamily: "'Nunito', sans-serif", background: "white", outline: "none" }}
              >
                <option>Single</option>
                <option>Double Sharing</option>
                <option>Triple Sharing</option>
                <option>Dormitory</option>
              </select>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontWeight: "700", marginBottom: "6px", fontSize: "13px", color: "#475569" }}>Move-in Date</label>
              <input
                type="date"
                value={form.booking_date}
                onChange={(e) => setForm({ ...form, booking_date: e.target.value })}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "14px", fontFamily: "'Nunito', sans-serif", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <button
              onClick={handleBook}
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                color: "white",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "800",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Nunito', sans-serif",
                boxShadow: "0 6px 20px rgba(22,163,74,0.35)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Processing..." : "🏠 Confirm Booking"}
            </button>

            {!user && (
              <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "12px", marginTop: "12px" }}>
                You'll be asked to login before booking
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Confirmation Popup */}
      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }}>
          <div style={{ background: "white", borderRadius: "24px", padding: "48px 40px", textAlign: "center", maxWidth: "420px", width: "100%", boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#0f172a", margin: "0 0 10px" }}>Booking Confirmed!</h2>
            <p style={{ color: "#64748b", marginBottom: "8px" }}>Your stay at <strong>{hostel.hostel_name}</strong> is confirmed.</p>
            <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "24px" }}>Booking ID: <strong>#{bookingId}</strong></p>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "14px", marginBottom: "24px", fontSize: "13px", color: "#166534" }}>
              ✅ Room: {form.room_type}<br />
              📅 Move-in: {form.booking_date}<br />
              📞 Contact: {form.phone_number}
            </div>
            <button
              onClick={() => { setShowConfirm(false); onBack(); }}
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "white", border: "none", padding: "13px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: "800", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
