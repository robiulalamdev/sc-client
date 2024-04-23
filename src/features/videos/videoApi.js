import { apiSlice } from "../api/apiSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: (data) => ({
        url: "/v1/drive/createFolder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Drives"],
    }),
    addFile: builder.mutation({
      query: (data) => ({
        url: "/v1/drive/addFile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos", "Drives", "Folders"],
    }),
    getUserDrive: builder.query({
      query: () => "/v1/drive/getUserDrive",
      providesTags: ["Drives"],
    }),
    getFolderFile: builder.query({
      query: (id) => `/v1/drive/getFolderFile/${id}`,
      providesTags: ["Folders"],
    }),
    getUserAllFiles: builder.query({
      query: () => "/v1/drive/getUserAllFiles",
      providesTags: ["Videos"],
    }),
    updateFolder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/drive/updateFolder/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Drives"],
    }),
    deleteFile: builder.mutation({
      query: (data) => ({
        url: "/v1/drive/removeFile",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Drives", "Videos", "Folders"],
    }),
    removeFolder: builder.mutation({
      query: (id) => ({
        url: `/v1/drive/removeFolder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Drives", "Videos"],
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useAddFileMutation,
  useGetUserDriveQuery,
  useGetFolderFileQuery,
  useGetUserAllFilesQuery,
  useUpdateFolderMutation,
  useDeleteFileMutation,
  useRemoveFolderMutation,
} = videoApi;
