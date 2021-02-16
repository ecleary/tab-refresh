import React from 'react';
import ImageRow from './ImageRow.jsx';

const ImageSelector = ({ imageData }) => {
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
    imageRows.push(<ImageRow key={JSON.stringify(dataInThree)} imageData={dataInThree} />);
  });

  return (
    <div>
      <h2>ImageSelector</h2>
      {imageRows}
    </div>
  );
};

export default ImageSelector;
