import React from 'react';

const Header = ({ name, icon }) => {
  return (
    <div>
      <div>
        <div>{name}</div>
        <div>{icon}</div>
      </div>
    </div>
  );
};

export default Header;
