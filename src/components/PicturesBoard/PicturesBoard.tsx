import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchArtworksThunk,
  selectArtworks,
} from '../../features/artworks/artworksSlice'
import styles from './PicturesBoard.module.scss'
import PictureItemController from '../PictureItem/PictureItemController'

const PicturesBoard = () => {
  const dispatch = useAppDispatch()

  const artworksData = useAppSelector(selectArtworks)

  useEffect(() => {
    dispatch(fetchArtworksThunk())
  }, [dispatch])

  return (
    <div className={styles.board}>
      {artworksData.map((picture) => (
        <PictureItemController key={picture.id} picture={picture} />
      ))}
    </div>
  )
}

export default PicturesBoard
