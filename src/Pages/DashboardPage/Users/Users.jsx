import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import User from "../User/User";

const Users = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [],refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })



    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="font-bold bg-sky-300">
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Role</th>
                            <th> <p className="flex  justify-center">Make</p></th>
                            <th> <p className="flex  justify-center">Action</p></th>   
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <User key={user._id} user={user} index={index} refetch={refetch}></User>)
                        }

                    </tbody>
                </table>
            </div>















        </>

    );
};

export default Users;