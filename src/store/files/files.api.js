import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../api/headers";
import { baseUrl } from "../../api/baseUrl";

export const files = createApi({
  reducerPath: "files/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getProjectThree: build.query({
      query: (project_id) => ({
        url: "/file-entry/get-project-tree",
        headers: headers(),
        params: { project_id },
      }),
    }),
    getProjectFileEntry: build.query({
      query: ({ project_id, parent_id, q = "" }) => {
        const params = {
          project_id,
          q,
          ...(parent_id ? { parent_id } : {}), // тільки якщо є
        };

        return {
          url: "/file-entry/get-project-file-entry",
          headers: headers(),
          params,
        };
      },
    }),
    createFolder: build.query({
      query: (data) => ({
        url: "/file-entry/create-folder",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
    updateFolder: build.query({
      query: (data) => ({
        url: "/file-entry/update-folder",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
    deleteFolder: build.query({
      query: (folder_id) => ({
        url: "/file-entry/delete-folder",
        method: "POST",
        headers: headers(),
        body: { folder_id },
      }),
    }),
    moveFolder: build.query({
      query: (data) => ({
        url: "/file-entry/move-folder",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
    uploadFiles: build.mutation({
      query: (formData) => ({
        url: "/file-entry/upload-file",
        method: "POST",
        headers: headers(),
        body: formData,
      }),
    }),
    moveFile: build.query({
      query: (data) => ({
        url: "/file-entry/move-file",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
    deleteFile: build.query({
      query: (file_id) => ({
        url: "/file-entry/delete-file",
        method: "POST",
        headers: headers(),
        body: { file_id },
      }),
    }),
  }),
});

export const {
  useGetProjectFileEntryQuery,
  useGetProjectThreeQuery,
  useLazyCreateFolderQuery,
  useLazyUpdateFolderQuery,
  useLazyDeleteFolderQuery,
  useLazyMoveFolderQuery,
  useLazyMoveFileQuery,
  useUploadFilesMutation,
  useLazyDeleteFileQuery,
} = files;
