import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../api/headers";
import { baseUrl } from "../../api/baseUrl";

export const groups = createApi({
  reducerPath: "groups/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getGroups: build.query({
      query: ({ page, perPage = 25, sortBy, sortOrder, search }) => ({
        url: "/group/get-groups",
        headers: headers(),
        params: { perPage, page, sortBy, sortOrder, search },
      }),
    }),
    createGroup: build.query({
      query: (data) => ({
        method: "POST",
        url: "/group/create-group",
        headers: headers(),
        body: data,
      }),
    }),
    updateGroup: build.query({
      query: (data) => ({
        method: "POST",
        url: "/group/update-group",
        headers: headers(),
        body: data,
      }),
    }),
    deleteGroup: build.query({
      query: (id) => ({
        method: "DELETE",
        url: "/group/delete-group",
        headers: headers(),
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useLazyCreateGroupQuery,
  useLazyUpdateGroupQuery,
  useLazyDeleteGroupQuery,
} = groups;
