import { JSONResponse } from './artworksAPITypes'

enum URLS {
    ARTWORKS = 'https://api.artic.edu/api/v1/artworks',
    IMAGES = 'https://www.artic.edu/iiif/2/',
}

enum PATHS {
    IMAGES = '/full/843,/0/default.jpg',
}

const QUERY_PARAMS = {
    fields: 'id,title,artist_display,image_id,alt_text,thumbnail',
}

export async function fetchArtworks(page: string, limit: string) {
    const queryParams = new URLSearchParams({
        page,
        limit,
        fields: QUERY_PARAMS.fields
    })
    const response = await fetch(`${URLS.ARTWORKS}?${queryParams}`)
    const { data, errors }: JSONResponse = await response.json()
    return handleFetchError(response, data, errors)
}

export async function fetchArtworksByIds(ids: number[]) {
    const queryParams = new URLSearchParams({
        ids: ids.join(','),
        fields: QUERY_PARAMS.fields
    })
    const response = await fetch(`${URLS.ARTWORKS}?${queryParams}`)
    const { data, errors }: JSONResponse = await response.json()
    return handleFetchError(response, data, errors)
}

// **************************

function handleFetchError(response: Response, data: JSONResponse['data'], errors: JSONResponse['errors']) {
    if (response.ok) {
        return data
    } else {
        const error = new Error(errors?.map((e) => e.message).join('\n') ?? 'unknown')
        return Promise.reject(error)
    }
}
