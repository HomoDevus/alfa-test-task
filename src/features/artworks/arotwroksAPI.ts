import { JSONResponse } from './artworksAPITypes';

enum URLS {
  ARTWORKS = 'https://api.artic.edu/api/v1/artworks',
  IMAGES = 'https://www.artic.edu/iiif/2/'
}

enum PATHS {
  IMAGES = '/full/843,/0/default.jpg'
}

const FIELDS = new URLSearchParams({
  fields: 'id,title,artist_display,image_id,alt_text,thumbnail'
})

export async function fetchArtworks(page: string, limit: string) {
  const queryParams = new URLSearchParams({
    page,
    limit
  })
  const response = await fetch(`${URLS.ARTWORKS}?${queryParams}&${FIELDS}`)
  const { data, errors }: JSONResponse = await response.json()
  return handleFetchError(response, data,  errors)
}

// **************************

function handleFetchError(response: Response, data: JSONResponse['data'], errors: JSONResponse[
  'errors'
  ]) {
  if (response.ok) {
    return data
  } else {
    const error = new Error(errors?.map(e => e.message).join('\n') ?? 'unknown')
    return Promise.reject(error)
  }
}
