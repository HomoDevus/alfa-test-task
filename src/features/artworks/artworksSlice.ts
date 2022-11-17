import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Artwork } from './artworksSliceTypes'
import { RootState } from '../../app/store'
import { fetchArtworks, fetchArtworksByIds } from './arotwroksAPI'
import {
  addIsLikedProperty,
  getLocalStorageLikedArtworks,
  getParsedLocalStorage,
  pushToLocalStorage,
  removeFromLocalStorage,
} from '../../utils/app_helpers'

const artworksAdapter = createEntityAdapter<Artwork>()

const initialState = artworksAdapter.getInitialState({
  status: 'idle',
  is_filtered: false,
  pagination: {
    current_page: 1,
    total_pages: 0,
  },
})

export const fetchArtworksThunk = createAsyncThunk('artworks/fetchArtworks', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState
  const currentPage = state.artworks.pagination.current_page
  let response = await fetchArtworks(currentPage, 30)
  const likedArtworks = getLocalStorageLikedArtworks()
  const removedArtworks = getParsedLocalStorage('deleted_pictures')

  // If item was in local storage set is_liked to true
  response.data = response.data?.map(addIsLikedProperty(likedArtworks))
  // Filter deleted items
  response.data = response.data?.filter(function removeDeleted(picture) {
    return !removedArtworks.includes(picture.id)
  })
  response.data = response.data?.filter(function removeWithoutImage(picture) {
    return picture.image_id
  })
  return response
})

export const fetchLikedArtworksThunk = createAsyncThunk('artworks/fetchLikedArtworks', async () => {
  const likedArtworks = getLocalStorageLikedArtworks()
  if (!likedArtworks.length) return { data: [] }
  let response = await fetchArtworksByIds(likedArtworks)
  response.data = response.data?.map(function addIsLiked(picture) {
    return {
      ...picture,
      id_liked: true,
    }
  })
  return response
})

const artworksSlice = createSlice({
  name: 'artworks',
  initialState: initialState,
  reducers: {
    likePicture(state, action) {
      pushToLocalStorage('liked_pictures', action.payload)
      artworksAdapter.updateOne(state, { id: action.payload, changes: { is_liked: true } })
    },
    removePictureLike(state, action) {
      removeFromLocalStorage('liked_pictures', action.payload)
      artworksAdapter.updateOne(state, { id: action.payload, changes: { is_liked: false } })
    },
    deletePicture(state, action) {
      pushToLocalStorage('deleted_pictures', action.payload)
      artworksAdapter.removeOne(state, action.payload)
    },
    setIsFiltered(state, action) {
      state.is_filtered = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworksThunk.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchArtworksThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.pagination.current_page = action.payload.pagination.current_page + 1
        state.pagination.total_pages = action.payload.pagination.total_pages
        if (action.payload) {
          artworksAdapter.addMany(state, action.payload.data)
        }
      })
      .addCase(fetchArtworksThunk.rejected, (state) => {
        state.status = 'failed'
        console.error('Failed to fetch artworks')
      })
      // *************************
      .addCase(fetchLikedArtworksThunk.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchLikedArtworksThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload?.data) {
          artworksAdapter.upsertMany(state, action.payload.data)
        }
      })
      .addCase(fetchLikedArtworksThunk.rejected, (state) => {
        state.status = 'failed'
        console.error('Failed to fetch artworks by ids')
      })
  },
})

export const { selectAll: selectArtworks } = artworksAdapter.getSelectors<RootState>(
  (state) => state.artworks
)
export const selectArtworkStatus = (state: RootState) => state.artworks.status
export const selectIsFiltered = (state: RootState) => state.artworks.is_filtered
export const { likePicture, removePictureLike, deletePicture, setIsFiltered } = artworksSlice.actions

export default artworksSlice.reducer
