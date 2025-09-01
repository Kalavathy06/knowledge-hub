import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/docs/new">New Doc</Link>
      <Link to="/search">Search</Link>
      <Link to="/qna">Team Q&A</Link>
      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Hi, {user.name}</span>
            <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
