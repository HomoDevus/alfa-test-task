import { Artwork } from './artworksSliceTypes'

type Pagination = {
  current_page: number;
  limit: number;
  next_url: string;
  offset: number;
  total: number;
  total_pages: number;
}

export type JSONResponse = {
  data: Artwork[];
  pagination: Pagination;
  errors?: Array<{ message: string }>;
}
