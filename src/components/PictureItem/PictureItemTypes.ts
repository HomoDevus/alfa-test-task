import { Artwork } from '../../features/artworks/artworksSliceTypes'

export type PictureItemProps = {
  title: string
  artistDisplay: string
  imageId: string
  altText: string
  imageWidth: number
  imageHeight: number
  isLiked: boolean
  handleLikeClick: () => void
  handleDeleteClick: () => void
  thumbnailLqip: string
}

export type PictureItemControllerProps = {
  picture: Artwork
}
