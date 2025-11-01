import { useState } from "react";
import { signIn } from "@/lib/auth";
import { signInWithGoogle } from "@/lib/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ---------- Sign In with Email + Password ----------
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      signIn(email, password);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  };

  // ---------- Sign In with Google ----------
  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      signInWithGoogle();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">FlowList</h1>
        <p className="text-slate-500 mb-8">
          Organize your day with clarity and flow.
        </p>

        <form onSubmit={handleEmailSignIn} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-slate-300"></div>
          <span className="px-3 text-slate-400 text-sm">or</span>
          <div className="flex-grow h-px bg-slate-300"></div>
        </div>

        <button
          onClick={handleSignInWithGoogle}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full py-3 rounded-lg border border-slate-300 font-medium text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-slate-400 mt-6">
          By signing in, you agree to FlowList’s{" "}
          <a href="#" className="underline hover:text-slate-600">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-slate-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
