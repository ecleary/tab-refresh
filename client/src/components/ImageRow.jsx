import React from 'react';
import ImageThumbnail from './ImageThumbnail.jsx';

const ImageRow = ({ imageData }) => {
  const imageThumbnails = [];
  imageData.forEach((imageDetails) => {
    imageThumbnails.push(<ImageThumbnail key={JSON.stringify(imageDetails)} imageData={imageDetails} />);
  });

  return (
    <div>
      {/* <h3>ImageRow</h3> */}
      {imageThumbnails}
    </div>
  );
};

export default ImageRow;
