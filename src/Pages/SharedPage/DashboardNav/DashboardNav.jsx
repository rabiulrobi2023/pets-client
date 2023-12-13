import { NavLink } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { AiTwotoneAppstore } from "react-icons/ai";
import { PiGitPullRequest } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineCampaign } from "react-icons/md";
import { FcDonate } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";
import { LiaDonateSolid } from "react-icons/lia";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { authContext } from "../../../Context/AuthContext/AuthContext";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";



const DashboardNav = () => {
    const { user } = useContext(authContext)
    const axiosSecure = useAxiosSecure()

    const { data: userDB = [],isPending } = useQuery({
        queryKey: ["usersDB"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data
        }

    })
   
    if(isPending){
        <span className="loading loading-spinner loading-lg"></span>
        
    }





 const role= userDB?.role==="admin"||userDB?.role==="superAdmin"

    return (
        <div className="text-gray-500 px-5">
            <h1 className="text-3xl text-center py-4 font-bold ">Dahsboard</h1>
            {
                 role ?
                    <>

                        <ul className="flex flex-col gap-4 mt-4 text-lg ">
                            <li className="flex items-center gap-x-2 hover:text-sky-500"><FaUsers></FaUsers><NavLink to="dashboard/users">Users</NavLink></li>
                            <li className="flex items-center gap-x-2 hover:text-sky-500"><GiRabbit></GiRabbit><NavLink to="dashboard/all-pets">All Pets</NavLink></li>
                            <li className="flex items-center gap-x-2 hover:text-sky-500"><LiaDonateSolid ></LiaDonateSolid><NavLink to="/dashboard/all-donation">All Donation</NavLink></li>

                        </ul>

                    </> :""

            }


            <ul className="flex flex-col gap-4 mt-4 text-lg ">
                <li className="flex items-center gap-x-2 hover:text-sky-500"><MdAddTask></MdAddTask><NavLink to="dashboard/add-pet"> Add a Pet</NavLink></li>
                <li className="flex items-center gap-x-2 hover:text-sky-500"><AiTwotoneAppstore></AiTwotoneAppstore><NavLink>My Added Pets</NavLink></li>
                <li className="flex items-center gap-x-2 hover:text-sky-500"><PiGitPullRequest></PiGitPullRequest><NavLink>Adoption Request</NavLink></li>
                <li className="flex items-center gap-x-2 hover:text-sky-500"><IoCreateOutline></IoCreateOutline><NavLink>Create Donation Campaign</NavLink></li>
                <li className="flex items-center gap-x-2 hover:text-sky-500"><MdOutlineCampaign></MdOutlineCampaign><NavLink>My Donation Campaigns</NavLink></li>
                <li className="flex items-center gap-x-2 hover:text-sky-500"><FcDonate></FcDonate><NavLink>My Donations</NavLink></li>
            </ul>



        </div>
    );
};

export default DashboardNav;