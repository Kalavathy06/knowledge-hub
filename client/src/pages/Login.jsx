// client/src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { setAuth } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/auth/login", form);

      // ✅ Save to context
      setAuth({ token: data.token, user: data.user });

      // ✅ Save to localStorage for later API calls
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      nav("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {err && <div style={{ color: "#b00020" }}>{err}</div>}
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: 8 }}>
        No account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
