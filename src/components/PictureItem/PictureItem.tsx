import React from 'react'
import { PictureItemProps } from './PictureItemTypes'
import { getPictureRatio } from '../../utils/app_helpers'
import clsx from 'clsx'
import styles from './PictureItem.module.scss'
import HeartIcon from '../../icons/HeartIcon';
import TrashIcon from '../../icons/TrashIcon';

const PictureItem = ({
    title,
    artistDisplay,
    imageId,
    altText,
    imageWidth,
    imageHeight,
}: PictureItemProps) => {
    return (
        <div className={clsx(styles.pictureCard, styles[getPictureRatio(imageWidth, imageHeight)])}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.artist}>{artistDisplay}</p>
          <div className={styles.imageContainer}>
            <div className={styles.iconsContainer}>
              <button className={styles.likeButton}>
                <HeartIcon />
              </button>
              <hr />
              <button className={styles.deleteButton}>
                <TrashIcon />
              </button>
            </div>
          <img
                className={styles.image}
                src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
                alt={altText}
                loading="lazy"
            />
          </div>
        </div>
    )
}

export default PictureItem
