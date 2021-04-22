import { 
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
 import Bots from './bot/botList'
 import Users from './user/userList'
 const queryClient = new QueryClient()
 
 function Query() {
   return (
     // Provide the client to your App
     <QueryClientProvider client={queryClient}>
       <Bots/>
       <Users/>
     </QueryClientProvider>
   )
 }
 