import { useState } from "react";
import api from "../api";

export default function QnA() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [err, setErr] = useState("");

  async function ask(e) {
    e.preventDefault();
    setErr("");
    setA("");

    try {
      const { data } = await api.post("/search/qna", { question: q });
      setA(data.answer || "No answer returned");
    } catch (e) {
      setErr(e.response?.data?.message || e.message || "Q&A failed");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: "0 12px" }}>
      <h2>Team Q&A</h2>
      <form onSubmit={ask} style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Ask a question about team docs…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit">Ask</button>
      </form>
      {err && <div style={{ color: "#b00020", marginTop: 8 }}>{err}</div>}
      {a && (
        <div
          style={{
            marginTop: 16,
            whiteSpace: "pre-wrap",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 12,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}
