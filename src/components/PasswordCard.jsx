import React from 'react';

const PasswordCard = ({ site, username, password, notes }) => {
  return (
    <div className="p-4 border rounded shadow-md bg-white mb-2">
      <h2 className="font-bold">{site}</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Password:</strong> {password}</p>
      <p><strong>Notes:</strong> {notes}</p>
    </div>
  );
};

export default PasswordCard;
