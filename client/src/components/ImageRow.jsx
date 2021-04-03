import React from 'react';
import { ImageThumbnail } from './ImageThumbnail.jsx';

export const ImageRow = ({ imageData, onSetBackgroundImage }) => {
  const imageThumbnails = [];
  imageData.forEach((imageDetails) => {
    imageThumbnails.push(<ImageThumbnail key={JSON.stringify(imageDetails)} imageData={imageDetails} onSetBackgroundImage={onSetBackgroundImage} />);
  });

  return (
    <div>
      {imageThumbnails}
    </div>
  );
};
