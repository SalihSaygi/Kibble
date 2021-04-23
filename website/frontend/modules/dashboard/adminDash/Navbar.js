import React from 'react';

const Navbar = ({ setPage }) => {
  return ( 
    <nav>
      <button onClick={() => setPage('bots')}>Bots</button>
      <button onClick={() => setPage('users')}>Users</button>
    </nav>
  );
}
 
export default Navbar;