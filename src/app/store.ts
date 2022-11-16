import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import artworksReducer from '../features/artworks/artworksSlice'

export const store = configureStore({
  reducer: {
    artworks: artworksReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
