import React from 'react';
import styles from './styles/DropItem.module.css';
import { useRouter } from 'next/router';

const DropItem = ({ url, goToMenu, leftIcon, rightIcon, children }) => {
  const router = useRouter();

  const handleClick = e => {
    if (goToMenu) {
      setActiveMenu(goToMenu);
    }
    e.preventDefault();
    router.push(url);
  };
  return (
    <a href="#" className={styles.menuItem} onClick={handleClick}>
      <span className={styles.iconButton}>{leftIcon}</span>
      {children}
      <span className={styles.iconRight}>{rightIcon}</span>
    </a>
  );
};

export default DropItem;
