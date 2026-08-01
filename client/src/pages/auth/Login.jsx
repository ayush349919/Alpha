import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Mail, Lock, Eye, EyeOff, Send, MessageCircle, Users } from "lucide-react";

import { loginUser } from "../../features/auth/authThunk";
import alpha from "../../images/icons/alpha.png";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, accessToken, error } = useSelector(
        (state) => state.auth
    );

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

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
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#090E17] flex items-center justify-center p-4 sm:p-6 font-sans text-slate-200 overflow-hidden relative selection:bg-indigo-500 selection:text-white">
            
            {/* Communication Theme Background - Sonic Waves & Connections */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                {/* Central Glowing Node */}
                <div className="absolute w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[100px]" />
                
                {/* Pulsing Signal Rings (Represents Broadcasting/Communication) */}
                <div className="absolute w-[400px] h-[400px] border border-indigo-500/10 rounded-full animate-wave" />
                <div className="absolute w-[600px] h-[600px] border border-indigo-500/10 rounded-full animate-wave" style={{ animationDelay: '1.5s' }} />
                <div className="absolute w-[800px] h-[800px] border border-indigo-500/10 rounded-full animate-wave" style={{ animationDelay: '3s' }} />

                {/* Floating Chat Bubbles/Nodes Decoration */}
                <div className="absolute top-[20%] left-[15%] text-indigo-500/20 animate-float">
                    <MessageCircle size={48} />
                </div>
                <div className="absolute bottom-[20%] right-[15%] text-purple-500/20 animate-float" style={{ animationDelay: '2s' }}>
                    <Users size={56} />
                </div>
            </div>

            {/* Main Login Interface */}
            <div className="relative z-10 w-full max-w-[420px]">
                
                {/* App Logo & Header */}
                <div className="flex flex-col items-center mb-8 text-center">
                    {/* Sleek Squircle Logo Container */}
                    <div className="relative mb-6 group">
                        <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative w-20 h-20 bg-gradient-to-b from-[#1A2235] to-[#0F1423] rounded-3xl border border-white/10 flex items-center justify-center shadow-xl">
                            {/* Assuming alpha.png is white, it will contrast beautifully against the dark blue */}
                            <img src={alpha} alt="Alpha" className="w-11 h-11 object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]" />
                        </div>
                        {/* Status Dot (Online Indicator) */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0F1423] rounded-full shadow-[0_0_10px_#10b981]" />
                    </div>

                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Log in to Alpha
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Welcome back! Your team is waiting for you.
                    </p>
                </div>

                {/* Interactive Form Card */}
                <div className="bg-[#111726]/80 backdrop-blur-xl rounded-3xl border border-white/5 p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <form onSubmit={handleLogin} className="space-y-5">
                        
                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 ml-1">Email</label>
                            <div className="relative">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors duration-300 ${focusedInput === 'email' ? 'bg-indigo-500' : 'bg-transparent'}`} />
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput('email')}
                                    onBlur={() => setFocusedInput(null)}
                                    required
                                    disabled={loading}
                                    placeholder="Enter your email"
                                    className="w-full bg-[#0B0F19] border border-white/5 focus:border-indigo-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-semibold text-slate-400">Password</label>
                                <Link to="/sendotp" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors duration-300 ${focusedInput === 'password' ? 'bg-indigo-500' : 'bg-transparent'}`} />
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput('password')}
                                    onBlur={() => setFocusedInput(null)}
                                    required
                                    disabled={loading}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0B0F19] border border-white/5 focus:border-indigo-500/50 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                {error}
                            </div>
                        )}

                        {/* Submit Button - styled like a "Send Message" action */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3.5 px-6 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-[0_4px_14px_0_rgba(99,102,241,0.39)]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Connecting...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Continue</span>
                                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Quick Registration Link */}
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-sm text-slate-400">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-white font-semibold hover:text-indigo-400 transition-colors"
                            >
                                Get Alpha for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}