import { useContext } from "react";
import { authContext } from "../../Context/AuthContext/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivetRouter = ({children}) => {
    const location=useLocation()

  
    const {user}=useContext(authContext)
    if(user){
        return children
    }
    return <Navigate to="/login"  state={{from:location}}></Navigate>
};

export default PrivetRouter;