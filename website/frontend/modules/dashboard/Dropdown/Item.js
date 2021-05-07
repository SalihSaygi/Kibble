import React, { useState } from 'react'
import './index.css'

const Item = ({icon, children}) => {
    const [open, setOpen] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        setOpen(!open)
    }
    return (
        <li className="nav-item">
          <a href="#" className="icon-button" onClick={handleClick}>
              {icon}
          </a>  
          {open && children}
        </li>
    )
}

export default Item
