import React, { useState } from 'react';

const ChangePasswordModal = ({ onSave, onClose }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (password === confirm) {
      onSave(password);
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        <button type="submit">Change</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ChangePasswordModal;
