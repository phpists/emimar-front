import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
});

export const groupsActions = groupsSlice.actions;
export const groupsReducer = groupsSlice.reducer;
