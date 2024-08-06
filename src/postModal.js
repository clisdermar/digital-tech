import React, { useState } from "react";
import './postModal.css'; // Agrega estilos para el modal

function PostModal({ isOpen, onClose, onAddPost }) {
  const [imageSrc, setImageSrc] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamar a la función de agregar post y cerrar el modal
    onAddPost(imageSrc, caption);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="post-modal-overlay">
      <div className="post-modal-content">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Image URL"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            required
          />
          <textarea
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
          <button type="submit">Add Post</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default PostModal;