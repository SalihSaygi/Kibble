import { useRouter } from 'next/router'
import React from 'react'

const DropItem = ({url, goToMenu, leftIcon, rightIcon, children}) => {
    const handleClick = (e) => {
        if(goToMenu) {
            setActiveMenu(goToMenu)
        }
        const router = useRouter()
        e.preventDefault()
        router.push(url)
    }
    return (
        <a href="#" onClick={handleClick}>
            <span>{leftIcon}</span>
            {children}
            <span>{rightIcon}</span>
        </a>
    )
}

export default DropItem
