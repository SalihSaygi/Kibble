import React, { useState } from 'react'
import './index.css'
import DropItem from './DropItem'
import { CSSTransition } from 'react-transition-group';
//Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import LockIcon from '@material-ui/icons/Lock';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CodeIcon from '@material-ui/icons/Code';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';

import useMenuHeight from './useMenuHeight'

const url = window.location.href

const DropMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main')

    const { activeMenu, dropdownRef } = useMenuHeight();

    const calcHeght = (element) => {
        const height = element.offsetHeight
        setMenuHeight(height)
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
        <CSSTransition
            in={activeMenu === 'main'}
            classNames="menu-primary"
            timeout={500}
            unmountOnExit
            onEnter={calcHeght}
        >
        <div>
          <DropItem className="menu">{profile.name}</DropItem>
          <DropItem
            leftIcon={<AccountBoxIcon/>}
            url={`${url}/profile`}
          >My Profile</DropItem>
          <DropItem
            leftIcon={<SettingsApplicationsIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropItem>
          <DropItem
            leftIcon={<LockIcon/>}
            rightIcon={<ChevronIcon />}
            goToMenu="security">
            Security
          </DropItem>
          <DropItem
            leftIcon={<FormatListBulletedIcon/>}
            rightIcon={<ChevronIcon />}
            goToMenu="logs">
            Logs
          </DropItem>
           <DropItem url={`${url}/logout`} setActiveMenu={setActiveMenu} leftIcon={<ExitToAppIcon/>}>Log Out</DropItem>
        </div>  
        </CSSTransition>
        <CSSTransition
        in={activeMenu === 'settings'}
        classNames="menu-secondary"
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div>
          <DropItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Settings</h2>
          </DropItem>
          <DropItem url={`${url}/settings/Bot`} setActiveMenu={setActiveMenu} leftIcon={<CodeIcon />}>Bot</DropItem>
          <DropItem url={`${url}/settings/Audio`} setActiveMenu={setActiveMenu} leftIcon={<AudiotrackIcon />}>Audio</DropItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'security'}
        classNames="menu-secondary"
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div>
          <DropItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Security</h2>
          </DropItem>
          <DropItem url={`${url}/security#password`} setActiveMenu={setActiveMenu} leftIcon={<VpnKeyIcon/>}>Password</DropItem>
          <DropItem url={`${url}/security#email`} setActiveMenu={setActiveMenu} leftIcon={<AlternateEmailIcon/>}>Email</DropItem>
          <DropItem url={`${url}/security/terminate`} setActiveMenu={setActiveMenu} leftIcon={<DeleteForeverIcon/>}>Delete Account</DropItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'logs'}
        classNames="menu-secondary"
        timeout={500}
        unmountOnExit
        onEnter={calcHeight}>
        <div>
          <DropItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Download Logs</h2>
          </DropItem>
          <DropItem url={`${url}/logs#week`} setActiveMenu={setActiveMenu}>Last Week</DropItem>
          <DropItem url={`${url}/logs#today`} setActiveMenu={setActiveMenu}>Today</DropItem>
        </div>
      </CSSTransition>
      </div>
    )
}

export default DropMenu
