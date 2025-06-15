import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Login } from "./pages/Login";
import { Projects } from "./pages/Projects/Projects";
import { ContentWrapper } from "./pages/ContentWrapper";
import { Profile } from "./pages/Profile/Profile";
import { Project } from "./pages/Project/Project";
import { useEffect } from "react";
import { Users } from "./pages/Users/Users";
import { useAppSelect } from "./hooks/redux";
import { ToastContainer } from "react-toastify";
import { useLazyGetUserQuery } from "./store/auth/auth.api";
import { useActions } from "./hooks/actions";

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelect((state) => state.auth);
  const [getUser] = useLazyGetUserQuery();
  const { loginUser } = useActions();

  const handleGetUser = () => {
    getUser().then((resp) => {
      if (resp.isSuccess) {
        loginUser(resp?.data?.response);
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && location.pathname !== "/login") {
      navigate("/login");
    } else if (token && !user) {
      handleGetUser();
    } else {
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      <ToastContainer />
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
    </>
  );
};
