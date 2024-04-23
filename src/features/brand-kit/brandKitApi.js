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

    // getProjectDetails: builder.query({
    //   query: (id) => `/v1/project/${id}`,
    //   providesTags: ["Project"],
    // }),
  }),
});

export const { useCreateBrandMutation } = brandKitApi;
