import { Navigate } from "react-router-dom";
import {useAppSelect} from "./hooks/redux";

export const RequireAuth = ({ children, roleId }) => {
    const { user } = useAppSelect((state) => state.auth);
    const currentUser = user?.user || user;

    if (!currentUser?.id) return <Navigate to="/login" replace />;
    if (roleId && currentUser?.role_id !== roleId) return <Navigate to="/" replace />;

    return children;
};
