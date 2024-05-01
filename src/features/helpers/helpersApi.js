import { apiSlice } from "../api/apiSlice";

export const helpersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendInvite: builder.mutation({
      query: (data) => ({
        url: "/v1/helpers/invite",
        method: "POST",
        body: data,
      }),
    }),
    verifyInviteToken: builder.mutation({
      query: (data) => ({
        url: "/v1/helpers/verify-invite-token",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendInviteMutation, useVerifyInviteTokenMutation } =
  helpersApi;
