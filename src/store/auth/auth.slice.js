import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  selectedProject: localStorage.getItem("selectedProject") ?? null,
  selectedItem: null
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
    selectItem(state, action) {
      state.selectedItem = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    }
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
