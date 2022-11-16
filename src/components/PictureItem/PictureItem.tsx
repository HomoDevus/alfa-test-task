import React from 'react'
import { PictureItemProps } from './PictureItemTypes'
import { getPictureRatio } from '../../utils/app_helpers'
import clsx from 'clsx'
import styles from './PictureItem.module.scss'
import HeartIcon from '../../icons/HeartIcon'
import TrashIcon from '../../icons/TrashIcon'

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
          className={styles.image}
          src={`https://www.artic.edu/iiif/2/${imageId}/full/600,/0/default.jpg`}
          alt={altText}
        />
      </div>
    </div>
  )
}

export default PictureItem
