import { Link } from "react-router-dom";

const Adoption = ({ adoption }) => {
    const { _id,petImage, petName, petAge, petLocation } = adoption;
    return (
        <div className="card   bg-base-100 shadow-2xl px-5 pt-5 rounded-md">
            <figure className="">
                <img src={petImage} alt="Pet Image Upcomming" className="rounded-md w-[280px] h-[200px]" />
            </figure>
            <div className="card-body gap-1 ">
                <p className="card-title text-center mx-auto pb-2">{petName}</p>
                <p>Age: {petAge} Years</p>
                <p>Location: {petLocation}</p>
                <div className="card-actions pt-4">
                    <Link to={`/adoption-details/${_id}`}>
                        <button className="btn w-full py-0 bg-[#46B2E6] text-white rounded-md hover:bg-sky-700">Details</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Adoption;