import { useMemo } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import isDarkPrefered from './Preference'

const theme = useMemo(
    () =>
        createMuiTheme({
            palette: {
                type: isDarkPrefered ? 'dark' : 'light'
            }
        }),
    [isDarkPrefered]
)

export default theme