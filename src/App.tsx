import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./layouts/AppLayout";
import { CheckEmailPage } from "./pages/CheckEmailPage";
import { AuthCallback } from "./pages/AuthCallback";

function App() {
  const { user, loading } = useAuth();

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return loading ? (
      <p>Loading...</p>
    ) : user ? (
      children
    ) : (
      <Navigate to="/signin" />
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
