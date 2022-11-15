import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtworksThunk, selectArtworks, selectArtworkStatus } from '../../features/artworks/artworksSlice';
import PictureItem from '../PictureItem/PictureItem';

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
    <div>
      {artworksData.map(picture =>
        <PictureItem
          key={picture.id}
          title={picture.title}
          altText={picture.alt_text}
          artistDisplay={picture.artist_display}
          imageId={picture.image_id}
        />
      )}
    </div>
  );
};

export default PicturesBoard;