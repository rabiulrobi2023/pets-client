import bannerImage from "../../../assets/banner-home/banner-home.jpg"

const Banner = () => {
    return (
        <div className="hero h-[40vh] min-w-full" style={{ backgroundImage: `url(${bannerImage})`}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to <span className="text-[#43c0ff]">Pets House</span></h1>
                    <p className="mb-5">You can donate and adopt pets here</p>
                   
                </div>
            </div>
        </div>
    );
};

export default Banner;