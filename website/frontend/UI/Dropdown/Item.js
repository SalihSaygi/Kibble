import React, { useState } from 'react'

const Item = ({icon, children}) => {
    const [open, setOpen] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        setOpen(!open)
    }
    return (
        <li>
          <a href="#" onClick={handleClick}>
              {icon}
          </a>  
          {open && children}
        </li>
    )
}

export default Item
