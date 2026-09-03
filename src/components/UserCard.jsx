import React from 'react';

export const UserCard = ({ name, role }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '8px',
        margin: '8px 0',
      }}
    >
      <h3>{name}</h3>
      <p>
        <strong>Rol:</strong> {role}
      </p>
    </div>
  );
};
