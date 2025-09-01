

interface Doc {
  _id: string;
  title: string;
  summary?: string;
  content?: string;
  tags?: string[];
  createdBy?: any;
  updatedAt?: string;
  createdAt?: string;
}

interface Props {
  doc: Doc;
  onEdit: (doc: Doc) => void;
  onDelete: (doc: Doc) => void;
}

export default function DocCard({ doc, onEdit, onDelete }: Props) {
  return (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <h3 style={{ margin: "0 0 8px" }}>{doc.title}</h3>
      <p style={{ margin: "0 0 8px", color: "#555" }}>{doc.summary || doc.content?.slice(0,160)}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "8px 0" }}>
        {(doc.tags || []).map((t) => (
          <span key={t} style={{ fontSize: 12, padding: "2px 8px", border: "1px solid #ddd", borderRadius: 999 }}>{t}</span>
        ))}
      </div>
      <div style={{ fontSize: 12, color: "#777", marginBottom: 8 }}>
        by {doc.createdBy?.name || doc.createdBy} • {new Date(doc.updatedAt ?? doc.createdAt ?? Date.now()).toLocaleString()}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(doc)}>Edit</button>
        <button onClick={() => onDelete(doc)} style={{ color: "#b00020" }}>Delete</button>
      </div>
    </div>
  );
}
