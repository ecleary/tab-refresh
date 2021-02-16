import React from 'react';
import styled from 'styled-components';

const ThumbnailContainer = styled.div`
  display: inline-block;
`

const ImageThumbnail = ({ imageData }) => {
  const { thumb } = imageData.urls;

  return (
    <ThumbnailContainer>
      {/* <h4>ImageThumbnail</h4> */}
      <img src={thumb} />
    </ThumbnailContainer>
  );
};

export default ImageThumbnail;
