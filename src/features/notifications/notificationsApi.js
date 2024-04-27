import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myNotifications: builder.query({
      query: (meta) =>
        `/v1/notification/all/me?currentPage=${meta?.currentPage}&limit=${meta?.limit}`,
    }),
  }),
});

export const { useMyNotificationsQuery } = notificationsApi;
