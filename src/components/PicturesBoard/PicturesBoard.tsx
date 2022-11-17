import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchArtworksThunk,
  fetchLikedArtworksThunk,
  selectArtworks,
  selectArtworkStatus,
  selectIsFiltered,
} from '../../features/artworks/artworksSlice'
import styles from './PicturesBoard.module.scss'
import PictureItemController from '../PictureItem/PictureItemController'
import { Artwork } from '../../features/artworks/artworksSliceTypes'
import { columnToRow } from '../../utils/app_helpers'

const PicturesBoard = () => {
  const dispatch = useAppDispatch()
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([])
  const artworksData = useAppSelector(selectArtworks)
  const isFiltered = useAppSelector(selectIsFiltered)
  const status = useAppSelector(selectArtworkStatus)

  useEffect(() => {
    dispatch(fetchArtworksThunk())
    dispatch(fetchLikedArtworksThunk())
  }, [dispatch])

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.pageYOffset
      const windowSize = window.innerHeight
      const bodyHeight = document.body.offsetHeight

      const distanceToBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0)

      if (!isFiltered && status !== 'pending' && distanceToBottom < 1000) {
        dispatch(fetchArtworksThunk())
      }
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [isFiltered, status, dispatch])

  useEffect(() => {
    if (isFiltered) {
      setFilteredArtworks(
        artworksData.filter(function filterArtworksByLikes(artwork) {
          return artwork.is_liked
        })
      )
    } else {
      let columns =
        window.innerWidth > 1000 ? 4 : window.innerWidth > 600 ? 3 : window.innerWidth > 460 ? 2 : 1
      setFilteredArtworks(columnToRow(artworksData, columns))
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
