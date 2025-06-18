import React, { useEffect, useState } from 'react';

const EditUserModal = ({ user, onSave, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form); // теперь с ID
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="phone" value={form.phone} onChange={handleChange} />
        <button type="submit">Save</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditUserModal;
