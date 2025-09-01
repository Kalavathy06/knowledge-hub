export default function VersionModal({ open, onClose, versions = [] }) {
  if (!open) return null;
  return (
    <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.35)", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={{background:"#fff", width:"90%", maxWidth:720, borderRadius:10, padding:16}}>
        <h3>Version History</h3>
        <div style={{maxHeight:400, overflow:"auto"}}>
          {versions.length === 0 ? (
            <p style={{color:"#666"}}>No versions yet.</p>
          ) : versions.map((v, idx) => (
            <div key={idx} style={{border:"1px solid #eee", borderRadius:8, padding:10, marginBottom:10}}>
              <div style={{fontSize:12, color:"#666"}}>Saved: {new Date(v.timestamp || v.updatedAt || v.createdAt).toLocaleString()}</div>
              <div><strong>Title:</strong> {v.title}</div>
              <div style={{whiteSpace:"pre-wrap"}}><strong>Content:</strong> {v.content}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"right", marginTop:8}}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
