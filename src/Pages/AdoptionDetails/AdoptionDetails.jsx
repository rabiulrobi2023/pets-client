import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Footer from "../SharedPage/Footer/Footer";
import { useQuery } from "@tanstack/react-query";


const AdoptionDetails = () => {
    const {id}=useParams()
    const axiosSecure= useAxiosSecure()


    const { data: adoption = [] } = useQuery({
        queryKey: ["adoption"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adoptions/${id}`)
            return res.data
        }
    })

    const {petImage,petName,petAge,petLocation,longDescription,adpoted}=adoption
    console.log(petName)

 
    // axiosSecure.get(`/adoptions/${id}`)
    // .then(res=>{
    //     console.log(res.data)
    // })
    
    return (
        <div className="max-w-[1280px] mx-auto mt-28">
            <div className="card card-side rounded-none bg-base-100 shadow-xl flex flex-col p-10">
                <p className="text-3xl font-bold pb-8">Details of <span className="text-orange-500">{petName}:</span></p>
                <div className="flex gap-10 flex-col md:flex-row items-center">
                    <div className="w-[50%]"><img className="max-w-[320px] justify-center mx-auto" src={petImage} alt="Movie" /></div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-bold">{}</h2>
                        {/* <h2 className="text-3xl ">Category: {petCategory}</h2> */}
                       
                        <p className="text-2xl  ">Age: <span className="text-[#4783f3]" >{petAge} Years</span></p>
                        <h2 className="text-2xl ">Location: {petLocation}</h2>
                        <div className="flex gap-4 ">
                            {
                                adpoted ?
                                    <button disabled className="btn bg-[#F3A847] text-white text-base rounded-md hover:bg-[#F3A847] hover:opacity-75 w-24 disabled:text-gray-600">Adopt Now</button>
                                    :
                                    <button className="btn bg-sky-500 text-white text-base rounded-md hover:bg-sky-600 hover:opacity-75  ">Adpot Now</button>

                            }
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="text-2xl font-bold">Description:</p>
                    <p className="text-xl text-gray-800 text-justify">{longDescription}</p>
                </div>

            </div>

            {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}   
        </div>
    );
};

export default AdoptionDetails;