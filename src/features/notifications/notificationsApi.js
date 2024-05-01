import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    seenMyNotify: builder.mutation({
      query: (data) => ({
        url: "/v1/notification/seen-my-notify",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["notifications"],
    }),

    myNotifications: builder.query({
      query: (meta) =>
        `/v1/notification/all/me?currentPage=${meta?.currentPage}&limit=${meta?.limit}`,
      // providesTags: ["notifications"],
    }),
  }),
});

export const { useMyNotificationsQuery, useSeenMyNotifyMutation } =
  notificationsApi;
