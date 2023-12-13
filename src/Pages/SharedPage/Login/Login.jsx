
import { useForm, } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import formBg from "../../../assets/photo/formBg.jpg"
import { authContext } from "../../../Context/AuthContext/AuthContext";
import { useContext } from "react";
import logo from "../../../assets/logo.png"
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { replace } from "formik";





const Login = () => {
    const { loginWithPass, loginWithGoogle, user } = useContext(authContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)
    const from = location.state?.from?.pathname || "/"




    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()


    const onSubmit = async (formData) => {
        const email = formData.email;
        const password = formData.password

        loginWithPass(email, password)
            .then(result => {
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500

                });
                navigate(from, { replace: true });

            })
    }

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                axiosSecure.get(`/users/${result.user.email}`)
                    .then(res => {
                        if (res.data.userEmail != user.email) {
                            const userName = result.user.displayName;
                            const userEmail = result.user.email;
                            const userPhoto = result.user.photoURL;
                            const role = "user";
                            const userInfo = {
                                userName, userEmail, userPhoto, role
                            }
                            axiosSecure.post("/users", userInfo)
                                .then(res => {


                                })
                        }


                    })


                navigate(from, { replace: true });
            })
            .then(error => {

            })
    }






    return (
        <div style={{ background: `url(${formBg})` }} className=" w-full max-w-sm shadow-2xl   mx-auto rounded-xl mt-7 border-[1px] " >
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <Link to="/"> <img className="flex mx-auto pb-5" src={logo} alt="" /></Link>
                    <p className="text-2xl text-center font-bold  mb-5 text-[#83d0f6] 40">Login</p>



                    <div className="form-control mt-2">
                        <label className="label-text">
                            <span className="label-text font-bold text-gray-300">Email:</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter Your Email Adderss"
                            className="input input-bordered bg-transparent"
                        />
                        {errors.email && <p className="text-red-400">Email Address is required</p>}
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-gray-300">Password:</span>
                        </label>
                        <input type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                            })}
                            placeholder="Enter a strong password"
                            className="input input-bordered bg-transparent"
                        />

                        {errors.password && <p className="text-red-400">Password is required</p>}


                        {errors.password?.type === "minLength" && (
                            <p role="alert" className="text-red-400" >Minimum length 6</p>
                        )}

                        {errors.password?.type === "pattern" && (
                            <p role="alert" className="text-red-500">Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character</p>
                        )}

                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-transparent text-white font-bold hover:bg-[#9ca3a760] border-gray-30">Login</button>
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-300">Your have no any account?<span className="text-[#2a4497] font-bold"><Link to="/sign-up"> Registration Here</Link></span></p>
                <p className="text-center">Or</p>
                <button onClick={handleGoogleLogin} className="flex items-center gap-5 justify-center border-[1px] border-sky-300 py-1 rounded-md text-gray-900 font-semibold hover:bg-[#7f8c925e] w-full"><FcGoogle></FcGoogle>Loging With Google</button>
            </div>
        </div>
    );
};

export default Login;