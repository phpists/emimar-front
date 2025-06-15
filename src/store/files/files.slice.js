import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
});

export const filesActions = filesSlice.actions;
export const filesReducer = filesSlice.reducer;
