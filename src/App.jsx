import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Login } from "./pages/Login";
import { Projects } from "./pages/Projects/Projects";
import { ContentWrapper } from "./pages/ContentWrapper";
import { Profile } from "./pages/Profile/Profile";
import { Project } from "./pages/Project/Project";
import { useEffect, useState } from "react";
import { Users } from "./pages/Users/Users";
import { useAppSelect } from "./hooks/redux";
import { ToastContainer } from "react-toastify";
import { useLazyGetUserQuery } from "./store/auth/auth.api";
import { useActions } from "./hooks/actions";
import {Navigate} from "react-router-dom";
import {RequireAuth} from "./RequireAuth";
import {ROLES} from "./constats/roles";

export const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAppSelect((state) => state.auth);
    const [getUser] = useLazyGetUserQuery();
    const { loginUser } = useActions();
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    const handleGetUser = async () => {
        try {
            const resp = await getUser().unwrap();
            if (resp?.response) loginUser(resp.response);
        } catch (err) {
            console.error("Failed to fetch user:", err);
            navigate("/login");
        } finally {
            setIsUserLoaded(true);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const hasUserId = user?.id || user?.user?.id;

        if (!token && location.pathname !== "/login") {
            navigate("/login");
        } else if (token && !hasUserId) {
            handleGetUser();
        } else {
            setIsUserLoaded(true);
        }
    }, [location.pathname]);

    if (!isUserLoaded) return null;

    const currentUser = user?.user || user;

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route
                    path="/login"
                    element={
                        currentUser?.id ? <Navigate to="/" replace /> : <Login />
                    }
                />
                <Route
                    path="*"
                    element={
                        <ContentWrapper>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <RequireAuth>
                                            <Projects />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <RequireAuth>
                                            <Profile />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="/project"
                                    element={
                                        <RequireAuth>
                                            <Project />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="/users"
                                    element={
                                        <RequireAuth roleId={ROLES.ADMIN}>
                                            <Users />
                                        </RequireAuth>
                                    }
                                />
                            </Routes>
                        </ContentWrapper>
                    }
                />
            </Routes>
        </>
    );
};
