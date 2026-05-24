import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HostelCard from "./components/HostelCard";
import Details from "./components/Details";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";

const API = "https://stayfinder-backend-s2ka.onrender.com";

export default function App() {
  const [hostels, setHostels] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("stayfinder_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Fetch hostels from backend
  useEffect(() => {
    fetchHostels();
  }, [search, location, typeFilter]);

  const fetchHostels = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (location !== "All") params.append("location", location);
      if (typeFilter !== "All") params.append("type", typeFilter);
      const res = await fetch(`${API}/hostels?${params}`);
      const data = await res.json();
      setHostels(data);
    } catch {
      // fallback to sample data if backend not running
      setHostels(SAMPLE_HOSTELS);
    }
    setLoading(false);
  };

  // Fetch wishlist if logged in
  useEffect(() => {
    if (user) fetchWishlist();
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("stayfinder_token");
      const res = await fetch(`${API}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const map = {};
      data.forEach((h) => (map[h.id] = true));
      setWishlist(map);
    } catch {}
  };

  const toggleWishlist = async (hostelId) => {
    if (!user) { setShowAuth(true); return; }
    const token = localStorage.getItem("stayfinder_token");
    const isLiked = wishlist[hostelId];
    try {
      if (isLiked) {
        await fetch(`${API}/wishlist/${hostelId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => { const n = { ...prev }; delete n[hostelId]; return n; });
      } else {
        await fetch(`${API}/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ hostel_id: hostelId }),
        });
        setWishlist((prev) => ({ ...prev, [hostelId]: true }));
      }
    } catch {
      setWishlist((prev) =>
        isLiked
          ? (() => { const n = { ...prev }; delete n[hostelId]; return n; })()
          : { ...prev, [hostelId]: true }
      );
    }
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem("stayfinder_user", JSON.stringify(userData));
    localStorage.setItem("stayfinder_token", token);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setWishlist({});
    localStorage.removeItem("stayfinder_user");
    localStorage.removeItem("stayfinder_token");
  };

  if (selectedHostel) {
    return (
      <Details
        hostel={selectedHostel}
        user={user}
        onBack={() => setSelectedHostel(null)}
        onLoginRequired={() => setShowAuth(true)}
        API={API}
      />
    );
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      <Navbar user={user} onLogin={() => setShowAuth(true)} onLogout={handleLogout} />

      <Hero
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Hostels Section */}
      <section style={{ padding: "60px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", color: "#0f172a", marginBottom: "10px" }}>
            {typeFilter === "All" ? "Popular Stays" : typeFilter === "PG" ? "PG Accommodations" : "Hostels"}
          </h2>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            {loading ? "Loading..." : `${hostels.length} stays found`}
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#94a3b8", fontSize: "18px" }}>
            Loading hostels...
          </div>
        ) : hostels.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#94a3b8" }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔍</div>
            <p style={{ fontSize: "18px" }}>No stays found. Try a different search.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "28px",
          }}>
            {hostels.map((hostel) => (
              <HostelCard
                key={hostel.id}
                hostel={hostel}
                liked={!!wishlist[hostel.id]}
                onLike={() => toggleWishlist(hostel.id)}
                onView={() => setSelectedHostel(hostel)}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          API={API}
        />
      )}
    </div>
  );
}

// Fallback sample data if backend is not running
const SAMPLE_HOSTELS = [
  { id: 1, hostel_name: "Sunrise Hostel", type: "HOSTEL", location: "Near RV College, Bangalore", price: "₹6,500/month", rating: 4.5, amenities: "WiFi, Food, AC", image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" },
  { id: 2, hostel_name: "Acharya Boys Hostel", type: "HOSTEL", location: "Near Acharya Institute, Bangalore", price: "₹8,200/month", rating: 4.7, amenities: "WiFi, Food, Parking", image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800" },
  { id: 3, hostel_name: "Elite Hostel", type: "HOSTEL", location: "Near BMS College, Bangalore", price: "₹8,000/month", rating: 4.7, amenities: "WiFi, Food, AC", image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800" },
  { id: 4, hostel_name: "Green Nest PG", type: "PG", location: "Near PES University, Bangalore", price: "₹7,200/month", rating: 4.6, amenities: "WiFi, Food, AC", image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800" },
  { id: 5, hostel_name: "Comfort Living PG", type: "PG", location: "Near Jayanagar, Bangalore", price: "₹6,800/month", rating: 4.5, amenities: "WiFi, Food, AC", image_url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800" },
  { id: 6, hostel_name: "VIT Boys Hostel", type: "HOSTEL", location: "Near VIT University, Vellore", price: "₹5,500/month", rating: 4.3, amenities: "WiFi, Food, Gym", image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800" },
  { id: 7, hostel_name: "Chennai Student PG", type: "PG", location: "Near Anna University, Chennai", price: "₹6,000/month", rating: 4.4, amenities: "WiFi, Food, Laundry", image_url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800" },
  { id: 8, hostel_name: "Pune Scholar Hostel", type: "HOSTEL", location: "Near Symbiosis College, Pune", price: "₹7,500/month", rating: 4.6, amenities: "WiFi, Food, AC, Gym", image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800" },
  { id: 9, hostel_name: "Delhi Study Inn", type: "HOSTEL", location: "Near Delhi University, Delhi", price: "₹5,800/month", rating: 4.2, amenities: "WiFi, Food, Security", image_url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800" },
  { id: 10, hostel_name: "Mumbai Campus PG", type: "PG", location: "Near Mumbai University, Mumbai", price: "₹9,000/month", rating: 4.8, amenities: "WiFi, Food, AC, Gym", image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" },
];
