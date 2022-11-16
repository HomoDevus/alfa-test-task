import { Artwork } from '../features/artworks/artworksSliceTypes'

type RatioTypes = 'horizontal' | 'vertical' | 'squared'

export function getPictureRatio(width: number, height: number): RatioTypes {
    const layout = width > height ? 'horizontal' : 'vertical'
    let ratio

    if (layout === 'horizontal') {
        ratio = Math.ceil(width / height)
    } else {
        ratio = Math.ceil(height / width)
    }

    if (ratio >= 2) {
        return layout
    } else {
        return 'squared'
    }
}

export function getLocalStorageLikedArtworks(): number[] {
    // Get and parse liked items from localStorage
    const likedArtworks = getParsedLocalStorage('liked_pictures')
    return likedArtworks ? likedArtworks.map((id: string) => parseInt(id)) : []
}

export function addIsLikedProperty(likedArtworks: number[]) {
    return function addIsLikedMapper(picture: Artwork) {
        return {
            ...picture,
            is_liked: likedArtworks.includes(picture.id),
        }
    }
}

export function pushToLocalStorage(key: string, itemToAdd: any) {
    let prevLocalStorage = getParsedLocalStorage(key)
    prevLocalStorage.push(itemToAdd)
    localStorage.setItem(key, JSON.stringify(prevLocalStorage))
}

export function removeFromLocalStorage(key: string, removeItem: string) {
    let prevLocalStorage = getParsedLocalStorage(key)
    prevLocalStorage = prevLocalStorage.filter(function removeIds(id: string) {
        return id !== removeItem
    })
    localStorage.setItem(key, JSON.stringify(prevLocalStorage))
}

export function getParsedLocalStorage(key: string) {
    let prevLocalStorage = localStorage.getItem(key)
    if (!prevLocalStorage) return []
    return JSON.parse(prevLocalStorage)
}