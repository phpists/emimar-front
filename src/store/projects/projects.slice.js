import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
});

export const projectsActions = projectsSlice.actions;
export const projectsReducer = projectsSlice.reducer;
