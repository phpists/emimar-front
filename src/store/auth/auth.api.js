import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../api/headers";
import { baseUrl } from "../../api/baseUrl";

export const auth = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ login, password }) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ login, password })
      }),
    }),
    logout: build.query({
      query: () => ({
        url: "/auth/logout",
        headers: headers(),
      }),
    }),
    getUser: build.query({
      query: () => ({
        url: "/auth/user",
        headers: headers(),
      }),
    }),
    createUser: build.query({
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: "/user/update-user",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
    deleteUser: build.query({
      query: (id) => ({
        url: "/user/delete-user",
        method: "DELETE",
        headers: headers(),
        params: { id },
      }),
    }),
    getUsers: build.query({
      query: ({ page, perPage = 25, sortBy, sortOrder, search }) => ({
        url: "/user/get-users",
        headers: headers(),
        params: { perPage, page, sortBy, sortOrder, search },
      }),
    }),
    changePassword: build.query({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyLogoutQuery,
  useLazyGetUserQuery,
  useLazyCreateUserQuery,
  useLazyDeleteUserQuery,
  useLazyGetUsersQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useLazyChangePasswordQuery,
} = auth;
