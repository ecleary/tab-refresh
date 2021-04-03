import React from 'react';
import styles from './styles/ImageThumbnail.css';

export const ImageThumbnail = ({ imageData, onSetBackgroundImage }) => {
  const { thumb, full } = imageData.urls;

  return (
    <div className={styles.thumbnailContainer} onClick={(event) => onSetBackgroundImage(event, full)}>
      <img src={thumb} />
    </div>
  );
};
