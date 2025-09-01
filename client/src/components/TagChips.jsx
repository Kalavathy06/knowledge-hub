export default function TagChips({ tags, active, toggle }) {
  return (
    <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:12}}>
      {tags.map((t) => {
        const on = active.includes(t);
        return (
          <button
            key={t}
            onClick={() => toggle(t)}
            style={{
              padding:"4px 10px",
              borderRadius:999,
              border: on ? "1px solid #444" : "1px solid #ccc",
              background: on ? "#eee" : "transparent",
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
