import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import PageLoading from "./layout/PageLoading";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <PageLoading
        layout="fullscreen"
        size="lg"
        message="로그인 상태를 확인하는 중…"
        testId="auth-loading"
      />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
