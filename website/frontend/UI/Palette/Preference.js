import { useMediaQuery } from "@material-ui/core"

const isPreferenceSupported = () => {
    if(window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        return true
    }
    return false
}

const isDarkPrefered = () => { 
    if(isPreferenceSupported === true) {
        const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark')
        return prefersDarkMode
    }
    return
}

export default isDarkPrefered