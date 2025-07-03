import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: null
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    }
  },
});

export const projectsActions = projectsSlice.actions;
export const projectsReducer = projectsSlice.reducer;
