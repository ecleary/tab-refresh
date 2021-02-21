import React from 'react';
import styles from './styles/Background.css';

const Background = ({ backgroundImageUrl }) => {
  const root = document.querySelector(':root');
  root.style.setProperty('--background-image-url', `url(${backgroundImageUrl})`);

  return (
    <div className={styles.backgroundImage}></div>
  );
};

export default Background;
