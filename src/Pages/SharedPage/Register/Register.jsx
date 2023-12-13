import { useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import formBg from "../../../assets/photo/formBg.jpg"
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";
import { auth, authContext } from "../../../Context/AuthContext/AuthContext";
import { useContext } from "react";
import logo from "../../../assets/logo.png"
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { createUserWithPass,loginWithGoogle, user } = useContext(authContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()



    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = async (formData) => {

        const imageFile = { image: formData.profilePhoto[0] }
        const res = await axiosPublic.post(imageHostingAPI, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
     
        

        const userImage = res.data.data.url
        console.log(userImage)
        if (res.data.success) {

            createUserWithPass(formData.email, formData.password)
                .then(result => {
                    updateProfile(auth.currentUser, {
                        displayName: formData.name,
                        photoURL: userImage
                    })
                        .then(() => {

                            const userName = formData.name;
                            const userEmail = formData.email;
                            const userPhoto = userImage;
                            const role = "admin"
                            const userInfo = {
                                userName, userEmail, userPhoto, role
                            }
                            axiosSecure.post("/users", userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            position: "top-center",
                                            icon: "success",
                                            title: "Registration Successfull",
                                            showConfirmButton: false,
                                            timer: 1500

                                        });
                                        
                                      
                                        // navigate("/")
                                    }
                                })
                        })
                })
        }

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
                                    navigate("/")

                                })


                        }

                    })
            })
            .then(error => {

            })
    }



    // axiosSecure.get("/users",(req,res)=>{


    // })

    return (

        <div style={{ background: `url(${formBg})` }} className=" w-full max-w-sm shadow-2xl   mx-auto rounded-xl mt-7 border-[1px] " >
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <Link to="/"> <img className="flex mx-auto pb-5" src={logo} alt="" /></Link>
                    <p className="text-2xl text-center font-bold  mb-5 text-[#83d0f6] 40">Register an Account</p>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-gray-300">Name:</span>
                        </label>
                        <input type="text"
                            {...register("name", { required: true })}
                            placeholder="Enter your full name"
                            className="input input-bordered bg-transparent text-white"
                        />
                        {errors.email && <p className="text-red-400">Name Address is required</p>}
                    </div>

                    <div className="form-control mt-2">
                        <label className="label-text">
                            <span className="label-text font-bold text-gray-300">Email:</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter Your Email Adderss"
                            className="input input-bordered bg-transparent text-white"
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
                            className="input input-bordered bg-transparent text-white"
                        />

                        {errors.password && <p className="text-red-400">Password is required</p>}


                        {errors.password?.type === "minLength" && (
                            <p role="alert" className="text-red-400" >Minimum length 6</p>
                        )}

                        {errors.password?.type === "pattern" && (
                            <p role="alert" className="text-red-500">Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character</p>
                        )}

                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-gray-300">Upload Profile Picture:</span>
                        </label>
                        <input type="file"
                            {...register("profilePhoto", { required: true })}

                        />
                        {errors.profilePhoto && <p className="text-red-400">Profile Photo is required</p>}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-transparent text-white font-bold hover:bg-[#9ca3a760] border-gray-30">Regiater</button>
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-300">Already have an account?<span className="text-[#2a4497] font-bold"><Link to="/login"> Login here</Link></span></p>
                <p className="text-center">Or</p>
                <button onClick={handleGoogleLogin} className="flex items-center gap-5 justify-center border-[1px] border-sky-300 py-1 rounded-md text-gray-900 font-semibold hover:bg-[#7f8c925e] w-full"><FcGoogle></FcGoogle>Loging With Google</button>
            </div>
        </div>
    );
};

export default Register;