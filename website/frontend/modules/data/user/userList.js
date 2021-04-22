import React from 'react';
import User from './userDetails'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getUsers, updateApiToken } from '../../../api/userApi'

const User = () => {
  //Use this to change stuff
  const queryClient = useQueryClient()
 
   // Queries
  const {isLoading, isError, data, error} = useQuery('users', getUsers)

  const {isLoading, isError, data, error } = useMutation("apiToken", updateApiToken) 

  const mutation = useMutation(updateApiToken, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const onSubmit = event => {
     event.preventDefault()
     mutation.mutate(new FormData(event.target))
   }

  if (isLoading) {
     return <span>Loading...</span>
   }
 
   if (isError) {
     return <span>Error: {error.message}</span>
   }

  return (
    <><ul>
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
    </>
  );
}

export default User