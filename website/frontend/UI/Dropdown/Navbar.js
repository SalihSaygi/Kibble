import React from 'react'

const Navbar = ({children}) => {
    return (
        <nav>
           <ul>{children}</ul> 
        </nav>
    )
}

export default Navbar
