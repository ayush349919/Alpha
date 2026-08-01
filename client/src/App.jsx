import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import UnAuthorized from "./pages/UnAuthorized";
import Register from "./pages/auth/Register";
import SendOTP from "./pages/forgotpassword/SendOTP"; 
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshAccessToken } from "./features/auth/authThunk";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendotp" element={<SendOTP />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          {/* <Route path="/admin" element={<AdminPanel />} /> */}
        </Route>

        <Route path="/unauthorized" element={<UnAuthorized />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}