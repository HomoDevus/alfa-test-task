import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
    fetchArtworksThunk,
    selectArtworks,
    selectArtworkStatus,
} from '../../features/artworks/artworksSlice'
import PictureItem from '../PictureItem/PictureItem'
import styles from './PicturesBoard.module.scss'

const PicturesBoard = () => {
    const dispatch = useAppDispatch()

    const artworksData = useAppSelector(selectArtworks)
    const artworksStatus = useAppSelector(selectArtworkStatus)

    useEffect(() => {
        if (!artworksData.length && artworksStatus !== 'pending') {
            dispatch(fetchArtworksThunk())
        }
    }, [dispatch, artworksData, artworksStatus])

    return (
        <div className={styles.board}>
            {artworksData.map((picture) => (
                <PictureItem
                    key={picture.id}
                    title={picture.title}
                    altText={picture.alt_text}
                    artistDisplay={picture.artist_display}
                    imageId={picture.image_id}
                    imageWidth={picture.thumbnail.width}
                    imageHeight={picture.thumbnail.height}
                />
            ))}
        </div>
    )
}

export default PicturesBoard
