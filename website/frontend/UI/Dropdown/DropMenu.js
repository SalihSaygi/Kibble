import React, { useState, useEffect } from 'react'
import DropItem from './DropItem'
import { CSSTransition } from 'react-transition-group';
//Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';

const url = window.location.href

const DropMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
    const calcHeght = (element) => {
        const height = element.offsetHeight
        setMenuHeight(height)
    }
    const 
    return (
        <div style={{ height: menuHeight }} ref={dropdownRef}>
        <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            unmountOnExit
            onEnter={calcHeght}
        >
        <div>
          <DropItem>{profile.name}</DropItem>
          <DropItem
            leftIcon={<AccountBoxIcon/>}
            url={`${url}/profile`}
          >My Profile</DropItem>
          <DropItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropItem>
          <DropItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="security">
            Security
          </DropItem>
          <DropItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="logs">
            Logs
          </DropItem>
           <DropItem url={`${url}/logout`} setActiveMenu={setActiveMenu} leftIcon="👋🏻">Log Out</DropItem>
           <DropItem url={`${url}/help`} setActiveMenu={setActiveMenu} leftIcon="🤖">Help</DropItem>
        </div>  
        </CSSTransition>
        <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div>
          <DropItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Settings</h2>
          </DropItem>
          <DropItem url={`${url}/settings/Bot`} setActiveMenu={setActiveMenu} leftIcon={<BoltIcon />}>Bot</DropItem>
          <DropItem url={`${url}/settings/Audio`} setActiveMenu={setActiveMenu} leftIcon={<BoltIcon />}>Audio</DropItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'security'}
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div>
          <DropItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Security</h2>
          </DropItem>
          <DropItem url={`${url}/security#password`} setActiveMenu={setActiveMenu} leftIcon="🦘">Password</DropItem>
          <DropItem url={`${url}/security#email`} setActiveMenu={setActiveMenu} leftIcon="🐸">Email</DropItem>
          <DropItem url={`${url}/security/terminate`} setActiveMenu={setActiveMenu} leftIcon="🦋">Delete Account</DropItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'logs'}
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div>
          <DropItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Download Logs</h2>
          </DropItem>
          <DropItem url={`${url}/logs#week`} setActiveMenu={setActiveMenu} leftIcon="🦘">Last Week</DropItem>
          <DropItem url={`${url}/logs#today`} setActiveMenu={setActiveMenu} leftIcon="🐸">Today</DropItem>
        </div>
      </CSSTransition>
      </div>
    )
}

export default DropMenu
