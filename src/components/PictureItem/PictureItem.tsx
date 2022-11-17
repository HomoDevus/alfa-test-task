import React from 'react'
import { PictureItemProps } from './PictureItemTypes'
import { getPictureRatio } from '../../utils/app_helpers'
import clsx from 'clsx'
import styles from './PictureItem.module.scss'
import HeartIcon from '../../icons/HeartIcon'
import TrashIcon from '../../icons/TrashIcon'
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const PictureItem = ({
  title,
  artistDisplay,
  imageId,
  altText,
  imageWidth,
  imageHeight,
  isLiked,
  handleLikeClick,
  handleDeleteClick,
  thumbnailLqip,
}: PictureItemProps) => {
  return (
    <div className={clsx(styles.pictureCard, styles[getPictureRatio(imageWidth, imageHeight)])}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.artist}>{artistDisplay}</p>
      <div className={styles.imageContainer}>
        <div className={styles.iconsContainer}>
          <button className={clsx(styles.likeButton, isLiked && styles.liked)} onClick={handleLikeClick}>
            <HeartIcon />
          </button>
          <hr />
          <button className={styles.deleteButton} onClick={handleDeleteClick}>
            <TrashIcon />
          </button>
        </div>
        <img
          className={clsx(styles.image, "lazyload")}
          src={thumbnailLqip}
          data-src={`https://www.artic.edu/iiif/2/${imageId}/full/600,/0/default.jpg`}
          data-srcset={`https://www.artic.edu/iiif/2/${imageId}/full/700,/0/default.jpg 2500w,
          https://www.artic.edu/iiif/2/${imageId}/full/600,/0/default.jpg 2000w,
          https://www.artic.edu/iiif/2/${imageId}/full/500,/0/default.jpg 1440w,
          https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg 1024w`}
          alt={altText}
        />
      </div>
    </div>
  )
}

export default PictureItem
