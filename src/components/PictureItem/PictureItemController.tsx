import React from 'react'
import PictureItem from './PictureItem'
import { PictureItemControllerProps } from './PictureItemTypes'
import { deletePicture, likePicture, removePictureLike } from '../../features/artworks/artworksSlice'
import { useAppDispatch } from '../../app/hooks'

const PictureItemController = ({ picture }: PictureItemControllerProps) => {
  const dispatch = useAppDispatch()

  function handleLikeClick() {
    if (picture.is_liked) {
      dispatch(removePictureLike(picture.id))
    } else {
      dispatch(likePicture(picture.id))
    }
  }

  function handleDeleteClick() {
    dispatch(deletePicture(picture.id))
  }

  return (
    <PictureItem
      title={picture.title}
      altText={picture.alt_text}
      artistDisplay={picture.artist_display}
      imageId={picture.image_id}
      imageWidth={picture.width}
      imageHeight={picture.height}
      isLiked={picture.is_liked}
      thumbnailLqip={picture.thumbnail.lqip}
      handleLikeClick={handleLikeClick}
      handleDeleteClick={handleDeleteClick}
    />
  )
}

export default PictureItemController
