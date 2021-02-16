import React from 'react';
import ImageRow from './ImageRow.jsx';
import { ImageSelectorContainer } from './styles/ImageSelector.jsx';

const ImageSelector = ({ imageData, onSetBackgroundImage }) => {
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
    <ImageSelectorContainer>
      {imageRows}
    </ImageSelectorContainer>
  );
};

export default ImageSelector;
