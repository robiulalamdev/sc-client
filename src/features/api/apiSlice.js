import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../config/config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: async (headers, { getState, endpoints }) => {
      const token = getState()?.auth?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Videos",
    "AllProjects",
    "Project",
    "Comments",
    "UserProjects",
    "UserContactMessage",
    "brand-kit",
  ],
  endpoints: (builder) => ({}),
});
