import React from 'react';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { SidebarData } from './Data';
import Drop from './Drop';
import styles from './styles/Sidebar.module.css';

const SidebarNav = () => {
  return (
    <>
      <div className={styles.Nav}>
        <Link href="#" className={styles.NavIcon}>
          <MenuIcon />
        </Link>
      </div>
      <nav className={styles.sidebarNav}>
        <div className={styles.sidebarWrap}>
          <Link href="#">
            <div className={styles.NavIcon}>
              <CloseIcon />
            </div>
          </Link>
          {SidebarData.map((item, index) => {
            return <Drop item={item} key={index} />;
          })}
        </div>
      </nav>
    </>
  );
};

export default SidebarNav;
