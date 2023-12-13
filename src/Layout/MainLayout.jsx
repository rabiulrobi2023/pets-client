import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/SharedPage/Navbar/Navbar";
import Footer from "../Pages/SharedPage/Footer/Footer";



const MainLayout = () => {
    const location=useLocation()
    const notHeaderFooter=location?.pathname?.includes("login"||"sign-up")
    
    return (
        <div  className="max-w-[1300px] mx-auto">
            {
                !notHeaderFooter&&<Navbar></Navbar>
            }
           
            <Outlet></Outlet>
            {
                
                !notHeaderFooter&&<Footer></Footer>
            }
          

        </div>
    );
};

export default MainLayout;