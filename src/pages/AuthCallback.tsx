import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    } else if (user) {
      navigate("/");
    }
  }, [user, loading]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-semibold mb-2">Finishing Sign-In...</h1>
      <p className="text-gray-500">
        Please wait while we complete your authentication.
      </p>
    </div>
  );
};
