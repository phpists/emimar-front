import React, { useState } from 'react';
import axios from 'axios';

const UploadModal = ({ folderId, onClose, onUploaded }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach(file => formData.append('files[]', file));
    formData.append('folderId', folderId);

    await axios.post('/api/files/upload', formData);
    onUploaded();
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UploadModal;
