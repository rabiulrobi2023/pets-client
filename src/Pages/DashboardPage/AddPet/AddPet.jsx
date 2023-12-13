import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";
import Select from 'react-select'
import { useContext } from "react";
import { authContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment/moment";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const AddPet = () => {
    const axiosPublic = useAxiosPublic()
    const {user}=useContext(authContext)
    const axiosSecure=useAxiosSecure()

    const category=[
        {value:"Cat", label:"Cat"},
        {value:"Rabbit", label:"Rabbit"},
        {value:"Dog", label:"Dog"}
    ]




    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset
    } = useForm()

    const onSubmit = async (formData) => {

        const imageFile = { image: formData.profilePhoto[0] }
        const res = await axiosPublic.post(imageHostingAPI, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const userEmail=user.email;
        const userName=user.displayName;
        const petImage=res.data.data.url;
        const petName=formData.name;
        const petAge=formData.age;
        const petCategory=formData.category;
        const petLocation=formData.location;
        const shortDescription=formData.shortDes;
        const longDescription=formData.longDes
        const adoptionDate=moment().format("DD"-"MMM"-"YYYY")
        const adopted="false"
        
        const adoptionInfo={
            userEmail,userName,petImage,petName,petAge,petCategory,petLocation,shortDescription,longDescription,adoptionDate,adopted
        }
        console.log(adoptionInfo)
       

        axiosSecure.post("/adoptions",adoptionInfo)
        .then((res=>{
            if(res.data.insertedId){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${petName} Pet Adoption Successfull`,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
        }))
        reset()
        


       


    }

    return (
        <div>
            <p className="text-3xl font-bold mt-3 text-center">Add a Pet</p>

            <div className="bg-opacity-50 p-8 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="">

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-gray-600">Pet Name</span>
                            </label>
                            <input type="text"
                                {...register("name", { required: true })}
                                placeholder="Enter your pet name"
                                className="input input-bordered rounded-sm "
                            />
                            {errors.name && <p className="text-red-400">Pet Name is required</p>}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-gray-600">Pet Age</span>
                            </label>
                            <input type="number" min={1}
                                {...register("age", { required: true })}
                                placeholder="Type pet age in year"
                                className="input input-bordered rounded-sm"
                            />
                            {errors.age && <p className="text-red-400">Pet age is required</p>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-gray-600">Category</span>
                            </label>
                       
                            <Select className="" options={category}
                               onChange={(x)=>{
                                setValue("category",x.value)

                               }}
                               styles={{
                                control:(style)=>({...style,height:"48px"})
                               }}
   
                            />
                            
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-gray-600">Location</span>
                            </label>
                            <input type="text" 
                                {...register("location")}
                                placeholder="Please type your pet location"
                                className="input input-bordered rounded-sm"
                            />
                            {errors.location && <p className="text-red-400">Location is required</p>}
                        </div>
                    </div>

                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-gray-600">Short Description</span>
                            </label>
                            <input type="text" 
                                {...register("shortDes")}
                                placeholder="Please write a short descritption about your pet"
                                className="input input-bordered rounded-sm"
                            />
                            
                        </div>

                    <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-gray-600">Log Description</span>
                            </label>
                           
                            <textarea 
                                {...register("longDes", { required: true })}
                                placeholder="Please write a long descritption about your pet"
                                className="input input-bordered rounded-sm h-24"
                            />
                            {errors.lognDis && <p className="text-red-400">Long discription is required</p>}
                        </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-gray-600">Upload pet photo</span>
                        </label>
                        <input type="file"
                            {...register("profilePhoto", { required: true })}

                        />
                        {errors.profilePhoto && <p className="text-red-400">Profile Photo is required</p>}
                    </div>

                    <div className="form-control mt-6">
                        <button  className="btn bg-[#46B2E6] text-white font-bold hover:bg-[#9ca3a760] border-none rounded-md">ADD PET</button>
                    </div>
                   
                </form>


            </div>
            
        </div>
    );
};

export default AddPet;