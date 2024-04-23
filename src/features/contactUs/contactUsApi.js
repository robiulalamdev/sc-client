import { apiSlice } from "../api/apiSlice";

export const contactUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => "/v1/contact-us/all",
      providesTags: ["AllContactMessage"],
    }),
    getUserContactMessage: builder.query({
      query: () => "/v1/contact-us/me",
      providesTags: ["UserContactMessage"],
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/v1/contact-us/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserContactMessage"],
    }),

    addAutoReply: builder.mutation({
      query: (data) => ({
        url: "/v1/contact-us/autoReply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserContactMessage"],
    }),

    getContactMessageById: builder.query({
      query: (id) => `/v1/contact-us/${id}`,
    }),
  }),
});

export const {
  useAddAutoReplyMutation,
  useAddMessageMutation,
  useGetAllProjectsQuery,
  useGetContactMessageByIdQuery,
  useGetUserContactMessageQuery,
} = contactUsApi;
