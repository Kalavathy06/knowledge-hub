import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { setAuth } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [err, setErr] = useState("");

  async function submit(e) {
  e.preventDefault();
  setErr("");
  try {
    const { data } = await api.post("/auth/register", form);
    console.log("Registration success:", data);
    // You can redirect or show message here
  } catch (e) {
    console.error("Registration error:", e.response || e);
    setErr(e.response?.data?.message || "Registration failed");
  }
}


  return (
    <div style={{maxWidth:420, margin:"60px auto"}}>
      <h2>Register</h2>
      <form onSubmit={submit} style={{display:"grid", gap:10}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        {err && <div style={{color:"#b00020"}}>{err}</div>}
        <button type="submit">Create account</button>
      </form>
      <div style={{marginTop:8}}>Have an account? <Link to="/login">Login</Link></div>
    </div>
  );
}
