// client/src/pages/DocForm.jsx
import { useState, useEffect } from "react";

const DocForm = ({ existingDoc, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // preload if editing
  useEffect(() => {
    if (existingDoc) {
      setTitle(existingDoc.title || "");
      setContent(existingDoc.content || "");
    }
  }, [existingDoc]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to save documents.");
        return;
      }

      const url = `${import.meta.env.VITE_API_URL}/docs`;
      console.log("➡️ Submitting to:", url);
      console.log("➡️ Payload:", { title, content });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ always send JWT
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(
          `Failed to save document. Status: ${response.status}. Server says: ${errText}`
        );
      }

      const data = await response.json();
      console.log("✅ Document saved:", data);

      // clear form if new doc, but keep values if editing
      if (!existingDoc) {
        setTitle("");
        setContent("");
      }

      // notify parent so dashboard updates
      if (onSave) onSave(data);
    } catch (err) {
      console.error("❌ Error saving document:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-2">
        {existingDoc ? "Edit Document" : "New Document"}
      </h2>

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter document title"
          required
        />
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block font-medium">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded h-40"
          placeholder="Enter document content"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DocForm;
