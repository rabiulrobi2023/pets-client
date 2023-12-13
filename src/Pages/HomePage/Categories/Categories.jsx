
import { useState } from "react";
import useAxiosPublic from "../../../Hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Category from "../Category/Category";

const Categories = () => {
    const axiosPublic=useAxiosPublic()
    const [categories,setCategories]=useState([])
    useQuery({
        queryKey:["categories"],
        queryFn: async ()=>{
            const data=await axiosPublic.get("/categories")
            setCategories(data.data)
          
        }
    })


    return (
        <div className=" flex flex-col mt-16 mx-auto pb-10 border-b-4 border-gray-100">
            <p className="text-center font-bold text-3xl text-[rgb(42,75,91)] uppercase mb-4">Categories</p>
            <div  className="flex flex-col md:flex-row gap-6 justify-center mx-auto">
            {
                categories.map(category=><Category key={category._id} category={category}></Category>)
                      
            }

            </div>
           
           

            
        </div>
    );
};

export default Categories;