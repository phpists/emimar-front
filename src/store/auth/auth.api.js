import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../api/headers";
import { baseUrl } from "../../api/baseUrl";

export const auth = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    login: build.query({
      query: ({ login, password }) => ({
        url: "/auth/login",
        method: "POST",
        params: { login, password },
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
    updateUser: build.query({
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
      query: ({ page, perPage = 25, q = "", sortBy = "id", sortDesc = false }) => ({
        url: "/user/get-users",
        headers: headers(),
        params: { perPage, page, q, sortBy, sortDesc},
      }),
    }),
    updateUserPassword: build.mutation({
      query: ({ user_id, password }) => ({
        url: "/auth/change-password",
        method: "POST",
        headers: headers(),
        params: { user_id, password }, // ← важливо!
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useLazyLogoutQuery,
  useUpdateUserPasswordMutation,
  useLazyGetUserQuery,
  useLazyCreateUserQuery,
  useLazyDeleteUserQuery,
  useLazyGetUsersQuery,
  useGetUsersQuery,
  useLazyUpdateUserQuery,
} = auth;
