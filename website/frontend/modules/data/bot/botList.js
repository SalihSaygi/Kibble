import React from 'react';
import Bot from './botDetails';

 import { useQueryClient } from 'react-query'
 
const Bot = () => {
    //Use this to change stuff
  const queryClient = useQueryClient()
 
   // Queries
  const {isLoading, isError, data, error} = useQuery('bots', getBot)

  if (isLoading) {
     return <span>Loading...</span>
   }
 
   if (isError) {
     return <span>Error: {error.message}</span>
   }

  return (
    <>
    { botListList.map((data) => {
        if (data) {
          return (
            <div key={data.githubId}>
              <Bot bot={data}/>
	        </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default Bot