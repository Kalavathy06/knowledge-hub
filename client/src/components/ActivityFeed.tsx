

interface Item {
  _id: string;
  title: string;
  createdBy?: any;
  updatedBy?: any;
  updatedAt?: string;
  createdAt?: string;
}

interface Props {
  items?: Item[];
}

export default function ActivityFeed({ items = [] }: Props) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
      <h4 style={{ marginTop: 0 }}>Team Activity</h4>
      {items.length === 0 ? (
        <div style={{ color: "#666" }}>No recent edits.</div>
      ) : items.slice(0,5).map((i) => (
        <div key={i._id} style={{ borderBottom: "1px dashed #eee", padding: "8px 0" }}>
          <div style={{ fontWeight: 600 }}>{i.title}</div>
          <div style={{ fontSize: 12, color: "#666" }}>
            {i.updatedBy?.name || i.createdBy?.name || "Someone"} • {new Date(i.updatedAt ?? i.createdAt ?? Date.now()).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
