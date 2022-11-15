export interface ArtworksState {
    status: 'idle' | 'loading' | 'failed'
}

export type Artwork = {
    id: number
    title: string
    artist_display: string
    image_id: string
    alt_text: string
    thumbnail: {
        width: number
        height: number
    }
}
