import {BASE_URL} from '@env';
// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ProductItem} from '../constants/types';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    getProducts: builder.query<ProductItem[], void>({
      query: () => ({
        url: 'products.json',
        method: 'GET',
      }),
      transformResponse: (rawRes: {data: ProductItem[]}) => {
        return rawRes.data;
      },
    }),
  }),
});

// Export the auto-generated hook for the `useGetProductsQuery` query endpoint
export const {useGetProductsQuery} = apiSlice;
