import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { Data } from './Data';
import Drop from './Drop';

const SidebarNav = () => {
  return (
    <>
      <div className="Nav">
          <Link to='#' className="NavIcon">
              <MenuIcon/>
          </Link>
      </div>
      <nav className="sidebarNav">
        <div className="sidebarWrap">
            <Link to="#" className="NavIcon">
                <CloseIcon/>
            </Link>
            {Data.map((item, index) => {
                return <Drop item={item} key={index}/>
            })}
        </div>
      </nav>
    </>
  );
};

export default SidebarNav;