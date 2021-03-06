import React from 'react';
import { ImageRow } from './ImageRow.jsx';
import styles from './styles/ImageSelector.css';

export const ImageSelector = ({ imageData, onSetBackgroundImage }) => {
  const dataInThrees = [];
  let currentDataInThree = [];
  imageData.forEach((imageDetails, index) => {
    if ((index + 1) % 3 === 0 || index === imageData.length - 1) {
      currentDataInThree.push(imageDetails);
      dataInThrees.push(currentDataInThree);
      currentDataInThree = [];
    } else {
      currentDataInThree.push(imageDetails);
    }
  });
  const imageRows = [];
  dataInThrees.forEach((dataInThree) => {
    imageRows.push(<ImageRow key={JSON.stringify(dataInThree)} imageData={dataInThree} onSetBackgroundImage={onSetBackgroundImage}/>);
  });

  return (
    <div className={styles.imageSelectorContainer}>
      <div className={styles.imageSelectorBackground} />
      <div className={styles.thumbnailContainer}>
        {imageRows}
      </div>
    </div>
  );
};
