import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import UserList from '../data/back/user/dataList';
import useSearch from '@hooks/useSearch';

const SearchPage = ({ url }) => {
  const [input, setInput] = useState('');
  const [dataListDefault, setDataListDefault] = useState();
  const [dataList, setDataList] = useState();

  const [isLoading]

  const fetchData = async () => {
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        setUserList(data);
        setUserListDefault(data);
      });
  };

  const updateInput = async input => {
    const filtered = userListDefault.filter(data => {
      return data.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setUserList(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>User List</h1>
      <SearchBar input={input} onChange={updateInput} />
      <UserList /> ? <UserList userList={dataList} /> :{' '}
      <BotList botList={dataList} />
    </>
  );
};

export default SearchPage;
