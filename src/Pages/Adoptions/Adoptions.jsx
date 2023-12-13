

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/Axios/useAxiosPublic';
import Adoption from '../Adoption/Adoption';


const Adoptions = () => {

    const axiosPublic = useAxiosPublic()

    const { data: adoptions = [] } = useQuery({
        queryKey: ["adoptions"],
        queryFn: async () => {
            const res = await axiosPublic.get("/adoptions")
            return res.data
        }
    })





    return (
        <div className='px-3 lg:px-40 mt-10'>
            <p className='text-3xl font-bold uppercase text-center mb-4'>Pets List</p>
            <div className='grid lg:grid-cols-3 gap-6 ' >
                {
                    adoptions.map(adoption => <Adoption key={adoption._id} adoption={adoption}></Adoption>)
                }

            </div>
        </div>

    );
};

export default Adoptions;