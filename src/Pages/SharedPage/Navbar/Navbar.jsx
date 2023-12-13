import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png"
import { useContext } from "react";
import { authContext } from "../../../Context/AuthContext/AuthContext";

const Navbar = () => {
    const navLink = <>
        <li className=""><NavLink to="/" className="">Home</NavLink></li>
        <li className="md:px-7"><NavLink to="/pet-list">Pet List</NavLink></li>
        <li><NavLink to="/">Donation Campaigns</NavLink></li>
    </>
    const { user, logOut } = useContext(authContext)


    const handleLogout = () => {
        console.log("Logout Handle Click")
        logOut()
            .then(() => {

            })
    }



    return (
        <div className="navbar text-white bg-gray-800 md:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <img className="w-16" src={logo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu-horizontal">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end ">
                {
                    user ?
                        <>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="" src={user.photoURL} />
                                    </div>
                                </div>
                                <ul className="menu menu-md dropdown-content  z-[1] p-2 shadow  w-48 bg-[#0a0b0cb5] px-6  mt-4 ">
                                    
                                    <li className="text-lg text-gray-400">{user?.displayName}</li>
                                    <li className="hover:bg-none">
                                        <Link to="/dashboard" className="text-lg hover:bg-none px-0 text-sky-300">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="text-left text-lg text-red-500 px-0">Logout</button>

                                    </li>




                                </ul>
                            </div>
                        </>

                        :
                        <Link to="/login"><button className="border-[1px] rounded-sm border-white px-4 py-[2px] bg-transparent text-white ">Login</button></Link>

                }

            </div>
        </div>
    );
};

export default Navbar;