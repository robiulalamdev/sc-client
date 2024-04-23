import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";
import Cookies from "js-cookie";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/v1/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "soCreativeAuth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing, handle from ui
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "soCreativeAuth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing, handle from ui
        }
      },
    }),
    updateUserSettings: builder.mutation({
      query: (data) => ({
        url: "/v1/auth/updateUserInfo",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const result = await queryFulfilled;

          const userInfo = getState().auth;

          Cookies.set(
            "soCreativeAuth",
            JSON.stringify({
              accessToken: userInfo?.accessToken,
              user: result.data.data,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: userInfo?.accessToken,
              user: result.data.data,
            })
          );
        } catch (error) {}
      },
    }),
    makeSubscription: builder.mutation({
      query: (data) => ({
        url: "/v1/auth/makeSubscription",
        method: "POST",
        body: data,
      }),
    }),
    subscriptionPlan: builder.mutation({
      query: (data) => ({
        url: "/v1/auth/subscription-plan",
        method: "POST",
        body: data,
      }),
    }),
    getSubscriptionInvoices: builder.query({
      query: (customerId) => `/v1/auth/subscription-invoices/${customerId}`,
    }),
    getPaymentsInfo: builder.query({
      query: () => "/v1/auth/payments",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserSettingsMutation,
  useMakeSubscriptionMutation,
  useGetPaymentsInfoQuery,
  useSubscriptionPlanMutation,
  useGetSubscriptionInvoicesQuery,
} = authApi;
