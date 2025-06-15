import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authActions } from "../store/auth/auth.slice";
import { groupsActions } from "../store/groups/groups.slice";
import { projectsActions } from "../store/projects/projects.slice";
import { filesActions } from "../store/files/files.slice";

const actions = {
  ...authActions,
  ...groupsActions,
  ...projectsActions,
  ...filesActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
