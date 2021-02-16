import React from 'react';
import { ThumbnailContainer } from './styles/ImageThumbnail.jsx';

const ImageThumbnail = ({ imageData, onSetBackgroundImage }) => {
  const { thumb, full } = imageData.urls;

  return (
    <ThumbnailContainer onClick={(event) => onSetBackgroundImage(event, full)}>
      <img src={thumb} />
    </ThumbnailContainer>
  );
};

export default ImageThumbnail;
