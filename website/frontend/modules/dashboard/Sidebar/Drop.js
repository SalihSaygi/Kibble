import React, { useState } from 'react';
import NavLink from './NavLink';
import styles from './styles/Drop.module.css';

const Drop = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <NavLink
        activeClassName={styles.sidebarLinkActive}
        className={styles.sidebarLink}
        href={item.path}
        onClick={item.subNav && showSubnav}
      >
        <div>
          <div>
            {item.icon}
            <span classname={styles.sidebarLabel}>{item.title}</span>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </div>
      </NavLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink
              activeClassName={styles.dropdownLinkActive}
              className={styles.dropdownLink}
              href={item.path}
              key={index}
            >
              <div>
                {item.icon}
                <span
                  activeClassName={styles.sidebarLabelActive}
                  className={sidebarLabel}
                >
                  {item.title}
                </span>
              </div>
            </NavLink>
          );
        })}
    </>
  );
};

export default Drop;
