import { Artwork } from './artworksSliceTypes'

export type JSONResponse = {
    data?: Artwork[]
    errors?: Array<{ message: string }>
}
