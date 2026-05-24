import { useState } from "react";

export default function AuthModal({ onClose, onLogin, API }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const endpoint = isLogin ? "login" : "register";
      const res = await fetch(`${API}/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(data.user, data.token);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    fontSize: "15px",
    fontFamily: "'Nunito', sans-serif",
    boxSizing: "border-box",
    outline: "none",
    marginBottom: "14px",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "20px" }}>
      <div style={{ background: "white", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "420px", boxShadow: "0 25px 60px rgba(0,0,0,0.2)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "20px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#94a3b8" }}>✕</button>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", margin: "0 0 6px", color: "#0f172a" }}>
          {isLogin ? "Welcome back 👋" : "Create account 🏠"}
        </h2>
        <p style={{ color: "#94a3b8", margin: "0 0 28px", fontSize: "14px" }}>
          {isLogin ? "Login to book your perfect stay" : "Join thousands of happy students"}
        </p>

        {!isLogin && (
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
        )}
        <input
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={inputStyle}
        />

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 14px", color: "#dc2626", fontSize: "13px", marginBottom: "14px" }}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "800",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
            opacity: loading ? 0.7 : 1,
            marginBottom: "18px",
          }}
        >
          {loading ? "Please wait..." : isLogin ? "Login →" : "Create Account →"}
        </button>

        <p style={{ textAlign: "center", color: "#64748b", fontSize: "14px", margin: 0 }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            style={{ color: "#2563eb", fontWeight: "700", cursor: "pointer" }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
