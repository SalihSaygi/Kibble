import { useRouter } from 'next/router'
import React from 'react'
import './index.css'

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
        <a href="#" className="menu-item" onClick={handleClick}>
            <span className="icon-button">{leftIcon}</span>
            {children}
            <span className="icon-right">{rightIcon}</span>
        </a>
    )
}

export default DropItem
