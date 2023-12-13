import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";

const User = ({ user, index, refetch }) => {
    const { userName, userEmail, userPhoto, role, _id, } = user;
    const axiosSecure = useAxiosSecure()



    const handleMakeAdmin = () => {
        Swal.fire({
            title: "Are you sure ?",
            text: `Are you sure you want to make ${userName} an admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, want it"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${_id}`)
                    .then(res => {
                        refetch()
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `${userName} has been successfully made an admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
            }


        });

    }

    const handleRemoveAdmin = () => {
        Swal.fire({
            title: "Are you sure ?",
            text: `Are you sure you want to remove ${userName} from admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, want it"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/admin/remove/${_id}`)
                    .then(res => {
                        refetch()
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `${userName} has been successfully removed from admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })

            }


        });


    }
    const handleBanUser = () => {
        Swal.fire({
            title: "Are you sure ?",
            text: `Are you sure you want to band ${userName} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, want it"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/admin/remove/${_id}`)
                    .then(res => {
                        refetch()
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `${userName} has been successfully removed from admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })

            }


        });

    }






    return (
        <tr>
            <th>{index + 1}</th>
            <td>{userName}</td>
            <td>{userEmail}</td>
            <td><img className="w-[50px] h-[50px] rounded-full" src={userPhoto} alt="" /></td>
            <td>{role}</td>


            {
                role === "superAdmin" ?
                    <td> <button disabled className="btn  text-red-600 bg-gray-300  border-none rounded-md  hover:opacity-75 flex mx-auto ">Super Admin</button></td>
                    :
                    <>
                        {
                            role === "admin" ?
                                <td> <button onClick={handleRemoveAdmin} className="btn  text-red-600 bg-gray-300  border-none rounded-md  hover:opacity-75 flex mx-auto ">Remove From Admin</button></td>
                                :
                                <td> <button onClick={handleMakeAdmin} className="btn bg-green-600 hover:bg-green-800 py-1 text-white border-none rounded-md hover:opacity- flex mx-auto  ">Make Admin</button></td>
                        }
                    </>

            }
            <td> <button onClick={handleBanUser} className="btn bg-green-600 hover:bg-green-800 py-1 text-white border-none rounded-md hover:opacity- flex mx-auto  ">Ban User</button></td>

        </tr>


    );
};

export default User;