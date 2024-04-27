import { apiSlice } from "../api/apiSlice";

export const activitiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createActivity: builder.mutation({
      query: (data) => ({
        url: "/v1/activities/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["activities"],
    }),
    myActivities: builder.query({
      query: () => `/v1/activities/my-activities`,
      providesTags: ["activities", "Project", "Comments"],
    }),
  }),
});

export const { useCreateActivityMutation, useMyActivitiesQuery } =
  activitiesApi;
