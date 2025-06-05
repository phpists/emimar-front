import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import { Login } from "./pages/Login";
import { Projects } from "./pages/Projects/Projects";
import { ContentWrapper } from "./pages/ContentWrapper";
import { Profile } from "./pages/Profile/Profile";
import { Project } from "./pages/Project/Project";
import { useEffect } from "react";
import { Users } from "./pages/Users/Users";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <ContentWrapper>
            <div>
              <Routes>
                <Route path="/" element={<Projects />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/users" element={<Users />} />
                <Route path="/project" element={<Project />} />
              </Routes>
            </div>
          </ContentWrapper>
        }
      />
    </Routes>
  );
};

