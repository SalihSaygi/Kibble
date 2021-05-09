import React from 'react';
import Bot from './botDetails';
 
const Bots = () => { 
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
    { data.map((d) => {
        if (d) {
          return (
            <div key={d.githubId}>
              <Bot bot={d}/>
	        </div>	
    	   )	
    	 }
    	 return null
    }) }
    </>
  );
}

export default Bots