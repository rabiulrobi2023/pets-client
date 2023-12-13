import { Outlet } from "react-router-dom";
import Navbar from "../Pages/SharedPage/Navbar/Navbar";
import DashboardNav from "../Pages/SharedPage/DashboardNav/DashboardNav";


const DashboardLayout = () => {
    return (
        <div className="max-w-[1300px] mx-auto flex">
            <div className="w-1/4 bg-gray-900 min-h-screen">
                <DashboardNav></DashboardNav>

            </div>
            <div className="w-3/4 bg-slate-300 ">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default DashboardLayout;