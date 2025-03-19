import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const ProtectedRoute = () => {
  const { authUser } = useAuthStore();
  
  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

