import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Shield, LogOut, User } from "lucide-react";
import { logoutUser } from "../features/auth/authThunk";

export default function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(
        (state) => state.auth
    );


    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">


            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-4xl font-bold">
                            Dashboard
                        </h1>

                        <p className="text-slate-400 mt-1">
                            Manage your account
                        </p>
                    </div>


                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                    >
                        <LogOut size={18}/>
                        Logout
                    </button>

                </div>



                {/* User Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center">
                            <User />
                        </div>


                        <div>
                            <h2 className="text-xl font-semibold">
                                Welcome, {user?.firstName}
                            </h2>

                            <p className="text-slate-400">
                                {user?.role}
                            </p>
                        </div>

                    </div>



                    <div className="space-y-3 text-slate-300">

                        <p>
                            <span className="font-semibold text-white">
                                Name:
                            </span>{" "}
                            {user?.firstName} {user?.lastName}
                        </p>


                        <p>
                            <span className="font-semibold text-white">
                                Email:
                            </span>{" "}
                            {user?.email}
                        </p>


                        <p>
                            <span className="font-semibold text-white">
                                Role:
                            </span>{" "}
                            {user?.role}
                        </p>

                    </div>


                </div>



                {/* Admin Access */}
                {
                    user?.role === "admin" && (

                        <div className="mt-6">

                            <Link to="/admin">

                                <button
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
                                >
                                    <Shield size={18}/>
                                    Admin Panel
                                </button>

                            </Link>

                        </div>

                    )
                }


            </div>

        </div>
    );
}