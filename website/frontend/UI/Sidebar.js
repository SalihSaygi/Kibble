import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },

  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Audio",
    path: "/audio",
    icon: <AudiotrackIcon />,
  },
  {
    title: "Help & Contact",
    path: "/contact",
    icon: <ContactSupportIcon />,
  },
];

const Sidebar = () => {
  return (
    <div>
      <ul>
        {SidebarData.map((data, key) => {
          return (
            <li
              key={key}
              id={data.path === window.location.pathname ? "active" : ""}
              onClick={() => (window.location.pathname = data.path)}
            >
              <div>{data.icon}</div>

              <div>
                <h3>{data.title}</h3>
              </div>
            </li>
          );
        })}
      </ul>
      <hr />
    </div>
  );
};
export default Sidebar;