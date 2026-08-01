import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    UserPlus,
    Loader2,
    ArrowRight,
    MessageCircle,
    Users
} from "lucide-react";

import { registerUser } from "../../features/auth/authThunk";
import alpha from "../../images/icons/alpha.png";

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector(
        (state) => state.auth
    );

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [focusedInput, setFocusedInput] = useState(null);

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await dispatch(registerUser(data)).unwrap();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#090E17] flex items-center justify-center p-4 sm:p-6 font-sans text-slate-200 overflow-hidden relative selection:bg-indigo-500 selection:text-white">

            {/* Communication Theme Background - Sonic Waves & Connections */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                {/* Central Glowing Node */}
                <div className="absolute w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[100px]" />
                
                {/* Pulsing Signal Rings */}
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

            {/* Main Register Interface */}
            <div className="relative z-10 w-full max-w-[420px]">

                {/* App Logo & Header */}
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="relative mb-6 group">
                        <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative w-20 h-20 bg-gradient-to-b from-[#1A2235] to-[#0F1423] rounded-3xl border border-white/10 flex items-center justify-center shadow-xl">
                            <img src={alpha} alt="Alpha" className="w-11 h-11 object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]" />
                        </div>
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0F1423] rounded-full shadow-[0_0_10px_#10b981]" />
                    </div>

                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Create account
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Join Alpha to connect and collaborate.
                    </p>
                </div>


                {/* Form Container */}
                <div className="bg-[#111726]/80 backdrop-blur-xl rounded-3xl border border-white/5 p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    
                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* First Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 ml-1">First Name</label>
                            <div className="relative">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors duration-300 ${focusedInput === 'firstName' ? 'bg-indigo-500' : 'bg-transparent'}`} />
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'firstName' ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={data.firstName}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput('firstName')}
                                    onBlur={() => setFocusedInput(null)}
                                    required
                                    disabled={loading}
                                    className="w-full bg-[#0B0F19] border border-white/5 focus:border-indigo-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                />
                            </div>
                        </div>


                        {/* Last Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 ml-1">Last Name</label>
                            <div className="relative">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors duration-300 ${focusedInput === 'lastName' ? 'bg-indigo-500' : 'bg-transparent'}`} />
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'lastName' ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={data.lastName}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput('lastName')}
                                    onBlur={() => setFocusedInput(null)}
                                    required
                                    disabled={loading}
                                    className="w-full bg-[#0B0F19] border border-white/5 focus:border-indigo-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                />
                            </div>
                        </div>


                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 ml-1">Email</label>
                            <div className="relative">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors duration-300 ${focusedInput === 'email' ? 'bg-indigo-500' : 'bg-transparent'}`} />
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput('email')}
                                    onBlur={() => setFocusedInput(null)}
                                    required
                                    disabled={loading}
                                    className="w-full bg-[#0B0F19] border border-white/5 focus:border-indigo-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                />
                            </div>
                        </div>


                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400 ml-1">Password</label>
                            <div className="relative">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors duration-300 ${focusedInput === 'password' ? 'bg-indigo-500' : 'bg-transparent'}`} />
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput('password')}
                                    onBlur={() => setFocusedInput(null)}
                                    required
                                    disabled={loading}
                                    className="w-full bg-[#0B0F19] border border-white/5 focus:border-indigo-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                />
                            </div>
                        </div>


                        {/* Error Message */}
                        {
                            error && (
                                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    {error}
                                </div>
                            )
                        }


                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3.5 px-6 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-[0_4px_14px_0_rgba(99,102,241,0.39)]"
                            >
                                {
                                    loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Creating account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <UserPlus size={18} className="transition-transform group-hover:scale-110" />
                                        </>
                                    )
                                }
                            </button>
                        </div>

                    </form>


                    {/* Login Link */}
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-white font-semibold hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                            >
                                Login
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}