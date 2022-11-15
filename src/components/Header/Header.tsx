import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h2>Art exhibition</h2>
      <input className={styles.input} placeholder="Search for picture..." />
    </header>
  );
};

export default Header;