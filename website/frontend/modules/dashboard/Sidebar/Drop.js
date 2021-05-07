import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Drop = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
        <NavLink activeClassName="sidebarLinkActive" className="sidebarLink" to={item.path} onClick={item.subNav && showSubnav}>
            <div>
                {item.icon}
                    <span classname="sidebarLabel">
                        {item.title}
                    </span>
                </div>
                <div>
                    {item.subNav && subnav
                    ? item.iconOpened
                    : item.subNav
                    ? item.iconClosed
                    : null}
            </div>
        </NavLink>
        {subnav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink activeClassName="dropdownLinkActive" className="dropdownLink" to={item.path} key={index}>
              {item.icon}
              <span activeClassName="sidebarLabelActive" className="sidebarLabel">{item.title}</span>
            </NavLink>
          );
        })}
    </>
  );
};

export default Drop;