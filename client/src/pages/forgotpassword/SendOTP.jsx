import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Loader2, ArrowRight, Sparkles } from "lucide-react";

import { sendOTP } from "../../features/auth/authThunk";


export default function SendOTP() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector(
        (state) => state.auth
    );


    const [email, setEmail] = useState("");



    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await dispatch(
                sendOTP({ email })
            ).unwrap();


            navigate("/verifyotp", {
                state: {
                    email
                }
            });


        } catch(error) {

            console.log(error);

        }

    };



    return (

        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">


            <div className="w-full max-w-md">


                {/* Logo */}

                <div className="flex justify-center mb-8">

                    <div className="
                        h-12
                        w-12
                        rounded-xl
                        bg-indigo-600
                        flex
                        items-center
                        justify-center
                    ">
                        <Sparkles />
                    </div>

                </div>



                <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-8
                ">


                    <h1 className="text-3xl font-bold mb-2">
                        Forgot Password?
                    </h1>


                    <p className="text-slate-400 mb-8">
                        Enter your email and we will send an OTP.
                    </p>




                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        <div className="relative">


                            <Mail
                                className="
                                absolute
                                left-4
                                top-3.5
                                text-slate-500
                                "
                            />


                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                required
                                className="
                                w-full
                                bg-slate-950
                                border
                                border-slate-800
                                rounded-xl
                                py-3
                                pl-12
                                outline-none
                                focus:border-indigo-500
                                "
                            />

                        </div>



                        {
                            error && (
                                <div className="
                                p-3
                                rounded-lg
                                bg-red-500/10
                                border
                                border-red-500/20
                                text-red-400
                                text-sm
                                ">
                                    {error}
                                </div>
                            )
                        }





                        <button
                            disabled={loading}
                            className="
                            w-full
                            bg-indigo-600
                            hover:bg-indigo-500
                            rounded-xl
                            py-3
                            flex
                            justify-center
                            items-center
                            gap-2
                            font-semibold
                            disabled:opacity-50
                            "
                        >

                            {
                                loading
                                ?
                                <>
                                    <Loader2 className="animate-spin"/>
                                    Sending OTP...
                                </>
                                :
                                <>
                                    Send OTP
                                    <ArrowRight size={18}/>
                                </>
                            }


                        </button>



                    </form>




                    <p className="text-center text-sm text-slate-400 mt-6">

                        Remember password?

                        <Link
                            to="/login"
                            className="
                            text-indigo-400
                            ml-2
                            hover:text-indigo-300
                            "
                        >
                            Login
                        </Link>

                    </p>


                </div>


            </div>


        </div>

    );
}