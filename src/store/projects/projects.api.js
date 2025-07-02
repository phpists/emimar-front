import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../api/headers";
import { baseUrl } from "../../api/baseUrl";

export const projects = createApi({
  reducerPath: "projects/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getProjects: build.query({
      query: ({ page, perPage = 25, q = "", sortBy = "title", sortDesc = false, search_type = 1 }) => ({
        url: "/project/get-projects",
        headers: headers(),
        params: { perPage, page, q, sortBy, sortDesc, search_type},
      }),
    }),
    createProject: build.query({
      query: (data) => ({
        method: "POST",
        url: "project/create-project",
        headers: headers(),
        body: data,
      }),
    }),
    updateProject: build.query({
      query: (data) => ({
        method: "POST",
        url: "/project/update-project",
        headers: headers(),
        body: data,
      }),
    }),
    deleteProject: build.query({
      query: (id) => ({
        method: "DELETE",
        url: "/project/delete-project",
        headers: headers(),
        body: { id },
      }),
    }),
    getLinks: build.query({
      query: ({ page, perPage = 25 }) => ({
        url: "/link/get-links",
        headers: headers(),
        params: { perPage, page},
      }),
    }),
    createLink: build.query({
      query: (data) => ({
        method: "POST",
        url: "/link/create-link",
        headers: headers(),
        body: data,
      }),
    }),
    updateLink: build.query({
      query: (data) => ({
        method: "POST",
        url: "/link/update-link",
        headers: headers(),
        body: data,
      }),
    }),
    deleteLink: build.query({
      query: (id) => ({
        method: "DELETE",
        url: "/link/delete-link",
        headers: headers(),
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetLinksQuery,
  useLazyCreateProjectQuery,
  useLazyCreateLinkQuery,
  useLazyUpdateProjectQuery,
  useLazyUpdateLinkQuery,
  useLazyDeleteProjectQuery,
  useLazyDeleteLinkQuery,
} = projects;
