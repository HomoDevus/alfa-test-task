import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Artwork } from './artworksSliceTypes'
import { RootState } from '../../app/store'
import { fetchArtworks } from './arotwroksAPI'

const artworksAdapter = createEntityAdapter<Artwork>()

const initialState = artworksAdapter.getInitialState({
    status: 'idle',
})

export const fetchArtworksThunk = createAsyncThunk('artworks/fetchArtworks', async () => {
    const response = await fetchArtworks('1', '10')
    console.log(response)
    return response
})

const artworksSlice = createSlice({
    name: 'artworks',
    initialState: initialState,
    reducers: {
        artworksReceived(state, action) {
            artworksAdapter.setAll(state, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtworksThunk.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchArtworksThunk.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload) {
                    artworksAdapter.setAll(state, action.payload)
                }
            })
            .addCase(fetchArtworksThunk.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export const { selectAll: selectArtworks } = artworksAdapter.getSelectors<RootState>(
    (state) => state.artworks
)
export const selectArtworkStatus = (state: RootState) => state.artworks.status

export default artworksSlice.reducer
