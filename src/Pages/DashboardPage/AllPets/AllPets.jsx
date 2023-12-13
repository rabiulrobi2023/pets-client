import {useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";

const AllPets = () => {
    const axiosSecure=useAxiosSecure()
    const {data:allPets=[]}=useQuery({
        queryKey:["allpets"],
        queryFn: async ()=>{
            const res= await axiosSecure.get("/adoptions")
            return res
        } 
    })
    console.log(allPets.data)
 
    
    
    return (
        <div>
            {
                <p>Pets:{allPets.data.length}</p>
            }
        
            
        </div>
    );
};

export default AllPets;