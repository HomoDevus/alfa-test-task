import React from 'react';
import { PictureItemProps } from './PictureItemTypes';

const PictureItem = ({ title, artistDisplay, imageId, altText }: PictureItemProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{artistDisplay}</p>
      <img src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`} alt={altText} />
    </div>
  );
};

export default PictureItem;