import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    UserPlus,
    Loader2,
    Sparkles,
    ArrowRight
} from "lucide-react";

import { registerUser } from "../../features/auth/authThunk";

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
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Sparkles className="w-6 h-6" />
                    </div>
                </div>


                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur">

                    <h1 className="text-3xl font-bold mb-2">
                        Create account
                    </h1>

                    <p className="text-slate-400 text-sm mb-8">
                        Register to get started.
                    </p>


                    <form
                        onSubmit={handleRegister}
                        className="space-y-5"
                    >


                        {/* First Name */}
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />

                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={data.firstName}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 outline-none focus:border-indigo-500"
                            />
                        </div>


                        {/* Last Name */}
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={data.lastName}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 outline-none focus:border-indigo-500"
                            />
                        </div>


                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={data.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 outline-none focus:border-indigo-500"
                            />
                        </div>


                        {/* Password */}
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 outline-none focus:border-indigo-500"
                            />
                        </div>


                        {
                            error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    {error}
                                </div>
                            )
                        }


                        <button
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >

                            {
                                loading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Creating...
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            Create Account
                                            <UserPlus size={18} />
                                        </>
                                    )
                            }

                        </button>


                    </form>


                    <p className="text-center text-sm text-slate-400 mt-6">

                        Already have account?{" "}

                        <Link
                            to="/login"
                            className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
                        >
                            Login
                            <ArrowRight size={14} />
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}