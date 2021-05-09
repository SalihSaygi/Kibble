import React from 'react';
import User from './userDetails'
import { useQuery, useQueryClient } from 'react-query'
import { getUsers } from '../../../api/userApi'
import mutation from './userMutate'

const Users = () => { 
   // Queries
  const {isLoading, isError, data, error} = useQuery('users', getUsers)

  if (isLoading) {
     return <span>Loading...</span>
   }
 
   if (isError) {
     return <span>Error: {error.message}</span>
   }

   const onSubmit = event => {
     event.preventDefault()
     mutation.mutate(new FormData(event.target))
   }

  return (
    <>
      <ul>
      { data.map((user) => {
          if (user) {
            return (
              <li key={user.githubId}>
                  <User user={user}/>
            </li>	
          )	
        }
        return null
      }) }
      </ul>
    <button onClick={() => {
      mutation.mutate({
        apiToken: generateToken()
      })
    }}></button>
    <form onSubmit={onSubmit}>form</form>
    </>
  );
}

export default Users