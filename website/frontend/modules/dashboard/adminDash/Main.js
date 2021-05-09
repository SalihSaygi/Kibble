import React, { useState } from 'react';
import Navbar from './Navbar'
import Bots from '../../data/back/bot/botList'
import Users from '../../data/back/user/userList';
import { ReactQueryDevtools } from 'react-query-devtools';


function Main() {
  let [page, setPage] = useState('bots');

  return (
    <>
      <div className="App">
      <h1>Database Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          { page === 'bots' ? <Bots /> : <Users /> }
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default Main;