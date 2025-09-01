import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import DocCard from "./components/DocCard";
import ActivityFeed from "./components/ActivityFeed";

export default function App() {
  const [docs, setDocs] = useState([]);
  const [activity, setActivity] = useState([]);

  // Fetch docs from backend
  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch("http://localhost:5001/api/docs");
        const data = await res.json();
        setDocs(data);
        setActivity(data); // For demo, activity feed uses same data
      } catch (err) {
        console.error(err);
      }
    }
    fetchDocs();
  }, []);

  const handleEdit = (doc: any) => {
    alert("Edit clicked: " + doc.title);
  };

  const handleDelete = (doc: any) => {
    alert("Delete clicked: " + doc.title);
  };

  return (
    <div style={{ padding: 20 }}>
      <NavBar />
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 3 }}>
          {docs.map((doc: any) => (
            <DocCard
              key={doc._id}
              doc={doc}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <ActivityFeed items={activity} />
        </div>
      </div>
    </div>
  );
}
