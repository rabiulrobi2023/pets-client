import {
    createBrowserRouter,

  } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import Home from "../../Pages/HomePage/Home/Home";
import Register from "../../Pages/SharedPage/Register/Register";
import Login from "../../Pages/SharedPage/Login/Login";
import DashboardLayout from "../../Layout/DashboardLayout";
import AddPet from "../../Pages/DashboardPage/AddPet/AddPet";
import Adoptions from "../../Pages/Adoptions/Adoptions";
import AdoptionDetails from "../../Pages/AdoptionDetails/AdoptionDetails";
import Users from "../../Pages/DashboardPage/Users/Users";
import PrivetRouter from "../PrivetRouter/PrivetRouter";
import AllPets from "../../Pages/DashboardPage/AllPets/AllPets";




const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/sign-up",
          element:<Register></Register>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/pet-list",
          element:<PrivetRouter><Adoptions></Adoptions></PrivetRouter>
        },
        {
          path:"/adoption-details/:id",
          element:<AdoptionDetails></AdoptionDetails>

        }

      ]
    },

    {
      path:"/dashboard",
      element:<PrivetRouter><DashboardLayout></DashboardLayout></PrivetRouter>,
      children:[
        {
          path:"dashboard/add-pet",
          element:<PrivetRouter><AddPet></AddPet></PrivetRouter>
        },
        {
          path:"dashboard/users",
          element:<Users></Users>
        },
        {
          path:"dashboard/all-pets",
          element:<AllPets></AllPets>
        }

      ]
    }
  ]);


export default router