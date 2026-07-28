import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { loginUser } from "../../features/auth/authThunk";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, accessToken, error } = useSelector((state) => state.auth);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (accessToken) {
            navigate("/dashboard");
        }
    }, [accessToken, navigate]);

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await dispatch(loginUser(data)).unwrap();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex">
            {/* Left Column: Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 z-10">
                {/* Brand Header */}
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                        YourBrand
                    </span>
                </div>

                {/* Main Form Container */}
                <div className="max-w-md w-full mx-auto my-auto py-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                            Welcome back
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Please enter your details to sign in to your account.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Email Address
                            </label>
                            <div className="relative flex items-center group">
                                <Mail className="absolute left-4 w-5 h-5 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="name@company.com"
                                    disabled={loading}
                                    required
                                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-700"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Password
                                </label>
                                <Link
                                    to="/forgotpassword"
                                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative flex items-center group">
                                <Lock className="absolute left-4 w-5 h-5 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    disabled={loading}
                                    required
                                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-700"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-in fade-in">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] py-3.5 px-4 font-semibold text-sm text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <LogIn className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <p className="mt-8 text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 group"
                        >
                            Create an account
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </p>
                </div>

                {/* Footer info */}
                <p className="text-xs text-slate-600 text-center lg:text-left">
                    &copy; {new Date().getFullYear()} YourBrand Inc. All rights reserved.
                </p>
            </div>

            {/* Right Column: Visual Side (Hidden on mobile, visible on desktop) */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center border-l border-slate-800/80">
                {/* Background Gradients & Effects */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

                {/* Hero Card Visual */}
                <div className="max-w-md p-8 relative z-10">
                    <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 backdrop-blur-md shadow-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
                            <Sparkles className="w-3.5 h-3.5" /> Product Update 2.0
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            Manage your workspace with speed & intelligence.
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Experience the next generation of platform tools built specifically for modern workflow needs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}