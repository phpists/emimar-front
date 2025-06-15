import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  selectedProject: localStorage.getItem("selectedProject") ?? null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    selectProject(state, action) {
      localStorage.setItem("selectedProject", action.payload);
      state.selectedProject = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
