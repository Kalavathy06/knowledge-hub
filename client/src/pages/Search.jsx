import { useState } from "react";
import api from "../api";
import DocCard from "../components/DocCard";

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [err, setErr] = useState("");

  async function runSearch(e) {
    e?.preventDefault();
    setErr("");
    try {
      const { data } = await api.get(`/api/search?query=${encodeURIComponent(q)}`);
      setResults(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.response?.data?.message || "Search failed");
    }
  }

  return (
    <div style={{maxWidth:900, margin:"20px auto", padding:"0 12px"}}>
      <h2>Search</h2>
      <form onSubmit={runSearch} style={{display:"flex", gap:8}}>
        <input placeholder="Search text…" value={q} onChange={e=>setQ(e.target.value)} style={{flex:1}} />
        <button type="submit">Search</button>
      </form>
      {err && <div style={{color:"#b00020", marginTop:8}}>{err}</div>}
      <div style={{marginTop:16}}>
        {results.map((d) => <DocCard key={d._id} doc={d} onEdit={()=>{}} onDelete={()=>{}} />)}
        {!results.length && <div style={{color:"#666"}}>No results yet.</div>}
      </div>
    </div>
  );
}
