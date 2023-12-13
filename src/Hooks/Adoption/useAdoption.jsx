import { useQuery } from "@tanstack/react-query/build/legacy";


const useAdoption = () => {
    const 
    const {data:adoptions=[]}=useQuery({
        queryKey:["adoptions"],
        queryFn:
    })
    return (
        <div>
            
        </div>
    );
};

export default useAdoption;