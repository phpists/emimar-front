import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { auth } from "./auth/auth.api";
import { authReducer } from "./auth/auth.slice";
import { groups } from "./groups/groups.api";
import { groupsReducer } from "./groups/groups.slice";
import { projects } from "./projects/projects.api";
import { projectsReducer } from "./projects/projects.slice";
import { files } from "./files/files.api";
import { filesReducer } from "./files/files.slice";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    auth: authReducer,
    [groups.reducerPath]: groups.reducer,
    groups: groupsReducer,
    [projects.reducerPath]: projects.reducer,
    projects: projectsReducer,
    [files.reducerPath]: files.reducer,
    files: filesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(auth.middleware)
      .concat(groups.middleware)
      .concat(projects.middleware)
      .concat(files.middleware),
});

setupListeners(store.dispatch);
