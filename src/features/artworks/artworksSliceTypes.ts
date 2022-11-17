export interface ArtworksState {
  status: 'idle' | 'loading' | 'failed'
}

export type Artwork = {
  id: number
  title: string
  artist_display: string
  image_id: string
  alt_text: string
  is_liked: boolean
  width: number
  height: number
  thumbnail: {
    lqip: string
    width: number
    height: number
    alt_text: string
  }
}
