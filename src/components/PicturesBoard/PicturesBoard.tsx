import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchArtworksThunk,
  selectArtworks, selectIsFiltered,
} from '../../features/artworks/artworksSlice'
import styles from './PicturesBoard.module.scss'
import PictureItemController from '../PictureItem/PictureItemController'
import { Artwork } from '../../features/artworks/artworksSliceTypes';

const PicturesBoard = () => {
  const dispatch = useAppDispatch()
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([])
  const artworksData = useAppSelector(selectArtworks)
  const isFiltered = useAppSelector(selectIsFiltered)

  useEffect(() => {
    dispatch(fetchArtworksThunk())
  }, [dispatch])

  useEffect(() => {
    if (isFiltered) {
      setFilteredArtworks(artworksData.filter(function filterArtworksByLikes(artwork) {
        return artwork.is_liked
      }))
    } else {
      setFilteredArtworks(artworksData)
    }
  }, [isFiltered, artworksData])

  return (
    <div className={styles.board}>
      {filteredArtworks.map((picture) => (
        <PictureItemController key={picture.id} picture={picture} />
      ))}
    </div>
  )
}

export default PicturesBoard
