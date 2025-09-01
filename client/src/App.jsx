import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DocForm from "./pages/DocForm";
import Search from "./pages/Search";
import QnA from "./pages/QnA";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/docs/new" element={<ProtectedRoute><DocForm/></ProtectedRoute>} />
        <Route path="/docs/:id/edit" element={<ProtectedRoute><DocForm/></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search/></ProtectedRoute>} />
        <Route path="/qna" element={<ProtectedRoute><QnA/></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </div>
  );
}
