import { JSONResponse } from './artworksAPITypes'

enum URLS {
  ARTWORKS = 'https://api.artic.edu/api/v1/artworks',
  IMAGES = 'https://www.artic.edu/iiif/2/',
}

const QUERY_PARAMS = {
  fields: 'id,title,artist_display,image_id,alt_text,width,height,thumbnail',
}

export async function fetchArtworks(page: number, limit: number) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    fields: QUERY_PARAMS.fields,
  })
  const response = await fetch(`${URLS.ARTWORKS}?${queryParams}`)
  const parsedResponse: JSONResponse = await response.json()
  return handleFetchError(response, parsedResponse)
}

export async function fetchArtworksByIds(ids: number[]) {
  const queryParams = new URLSearchParams({
    ids: ids.join(','),
    fields: QUERY_PARAMS.fields,
  })
  const response = await fetch(`${URLS.ARTWORKS}?${queryParams}`)
  const parsedResponse: JSONResponse = await response.json()
  return handleFetchError(response, parsedResponse)
}

// **************************

function handleFetchError(response: Response, parsedResponse: JSONResponse ) {
  if (response.ok) {
    return parsedResponse
  } else {
    const error = new Error(parsedResponse.errors?.map((e) => e.message).join('\n') ?? 'unknown')
    return Promise.reject(error)
  }
}
