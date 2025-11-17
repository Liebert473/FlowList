import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./layouts/AppLayout";
import { CheckEmailPage } from "./pages/CheckEmailPage";
import { AuthCallback } from "./pages/AuthCallback";
import { TasksPage } from "./pages/TasksPage";
import { Projects } from "./pages/Projects";
import { Journals } from "./pages/Journals";
import { Assistant } from "./pages/Assistant";
import { ProfilePage } from "./pages/ProfilePage";

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
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TasksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/journals"
            element={
              <PrivateRoute>
                <Journals />
              </PrivateRoute>
            }
          />
          <Route
            path="/assistant"
            element={
              <PrivateRoute>
                <Assistant />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
