import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const { accessToken, isAuthChecked, user } = useSelector(
        (state) => state.auth
    );

    if (!isAuthChecked) {
        return <div>Loading...</div>;
    }

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role)
    ) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;