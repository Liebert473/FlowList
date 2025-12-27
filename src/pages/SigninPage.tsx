import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/lib/auth";
import { signInWithGoogle } from "@/lib/auth";
import Logo from "@/components/common/Logo";
import { SvgImage2 } from "@/components/common/SvgImage2";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // ---------- Sign In with Email + Password ----------
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (err: any) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  };

  // ---------- Sign In with Google ----------
  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-fl-bg">
      {/* Left */}
      <div className="flex flex-col justify-center px-10 lg:px-20">
        {/* Brand */}
        <Logo />

        <h1 className="text-4xl font-bold text-fl-text mb-2 mt-8">
          Welcome Back
        </h1>
        <p className="text-gray-500 mb-8">Please enter your details</p>

        {/* Error */}
        {errorMsg && (
          <div className="mb-4 p-3 text-sm bg-red-100 text-red-600 rounded-lg">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
          <div>
            <span className="block text-sm font-medium mb-2">
              Email address
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent focus:border-fl-primary outline-none"
            />
          </div>

          <div>
            <span className="block text-sm font-medium mb-2">Password</span>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-transparent text-fl-text focus:border-fl-primary outline-none"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="flex items-center gap-2 cursor-pointer ">
              <input type="checkbox" className="accent-fl-primary" />
              Remember for 30 days
            </span>

            <span className="text-fl-primary cursor-pointer hover:underline">
              Forgot password
            </span>
          </div>

          {/* Sign in */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-fl-primary text-fl-insider rounded-lg font-medium hover:bg-fl-primary-hover transition"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>

          {/* Google */}
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-lg border border-fl-border font-medium hover:border-fl-primary transition disabled:opacity-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          Don't have an account?
          <a href="/signup" className="text-fl-primary ml-1 hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {/* Right side illustration */}
      <div className="hidden md:flex items-center justify-center bg-fl-primary/10 px-10">
        <SvgImage2 />
      </div>
    </div>
  );
}
