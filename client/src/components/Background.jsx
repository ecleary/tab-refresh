import React from 'react';
import { BackgroundImage } from './styles/Background.jsx';

const Background = ({ backgroundImageUrl }) => {
  return (
    <BackgroundImage backgroundImageUrl={backgroundImageUrl}>
    </BackgroundImage>
  );
};

export default Background;
