import { apiSlice } from "../api/apiSlice";

export const brandKitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/v1/brand-Kit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand-kit"],
    }),

    myBrandKits: builder.query({
      query: () => `/v1/brand-Kit/my-kits`,
      providesTags: ["brand-kit"],
    }),
  }),
});

export const { useCreateBrandMutation, useMyBrandKitsQuery } = brandKitApi;
