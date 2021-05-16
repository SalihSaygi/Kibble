import { withRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

const NavLink = ({ router, children, ...props }) => {
  const child = React.Children.only(children);

  let className = child.props.className || '';
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim();
  }

  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(NavLink);
