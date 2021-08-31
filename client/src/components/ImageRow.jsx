import React from "react";
import { ImageThumbnail } from "./ImageThumbnail.jsx";
import styles from "./styles/ImageRow.css";

export const ImageRow = ({ imageData, onSetBackgroundImage }) => {
  const imageThumbnails = [];
  imageData.forEach((imageDetails) => {
    imageThumbnails.push(
      <ImageThumbnail
        key={JSON.stringify(imageDetails)}
        imageData={imageDetails}
        onSetBackgroundImage={onSetBackgroundImage}
      />
    );
  });

  return <div className={styles.imageRowContainer}>{imageThumbnails}</div>;
};
