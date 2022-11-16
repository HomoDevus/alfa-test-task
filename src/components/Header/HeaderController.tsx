import React from 'react'
import Header from './Header'
import { useAppDispatch } from '../../app/hooks'
import { setIsFiltered } from '../../features/artworks/artworksSlice'

const HeaderController = () => {
  const dispatch = useAppDispatch()

  function handleFavoriteFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setIsFiltered(e.target.checked))
  }

  return <Header handleFavoriteFilterChange={handleFavoriteFilterChange} />
}

export default HeaderController
