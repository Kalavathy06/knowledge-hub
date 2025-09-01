import { useEffect, useMemo, useState } from "react";
import api from "../api";
import DocCard from "../components/DocCard";
import TagChips from "../components/TagChips";
import ActivityFeed from "../components/ActivityFeed";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);
  const [activity, setActivity] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const navigate = useNavigate();

  function toggleTag(t) {
    setActiveTags((prev) => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t]);
  }

  const allTags = useMemo(() => {
    const s = new Set();
    docs.forEach(d => (d.tags || []).forEach(t => s.add(t)));
    return Array.from(s);
  }, [docs]);

  const filtered = useMemo(() => {
    if (!activeTags.length) return docs;
    return docs.filter(d => (d.tags || []).some(t => activeTags.includes(t)));
  }, [docs, activeTags]);

  async function load() {
    const { data } = await api.get("/docs");
    setDocs(data || []);
    // try activity endpoint; fallback to last 5 updated docs
    try {
      const { data: act } = await api.get("/docs/activity");
      setActivity(act || []);
    } catch {
      const sorted = [...data].sort((a,b) => new Date(b.updatedAt||b.createdAt) - new Date(a.updatedAt||a.createdAt));
      setActivity(sorted.slice(0,5));
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(doc) {
    if (!confirm(`Delete "${doc.title}"?`)) return;
    await api.delete(`/docs/${doc._id}`);
    await load();
  }


  return (
    <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:16, padding:16}}>
      <div>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h2 style={{margin:0}}>Documents</h2>
          <button onClick={() => navigate("/docs/new")}>+ New</button>
        </div>
        <TagChips tags={allTags} active={activeTags} toggle={toggleTag}/>
        {filtered.map((d) => (
          <DocCard key={d._id} doc={d} onEdit={(doc)=>navigate(`/docs/${doc._id}/edit`)} onDelete={handleDelete} />
        ))}
        {!filtered.length && <div style={{color:"#666"}}>No documents yet.</div>}
      </div>
      <div>
        <ActivityFeed items={activity}/>
      </div>
    </div>
  );
}


