import { 
   QueryClient,
   QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../UI/Palette/Theme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </QueryClientProvider>
  )
}

export default MyApp