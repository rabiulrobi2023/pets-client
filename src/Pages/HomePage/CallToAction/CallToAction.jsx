import actionImage from "../../../assets/photo/call-to-action.jpg"

const CallToAction = () => {
    return (
        <div className="hero mx-auto  pt-10">
            <div className="hero-content flex-col lg:flex-row-reverse gap-8">
                <div className="w-full md:w-1/2">
                    <img  src={actionImage} className=" mx-auto h-1/2 rounded-lg shadow-2xl" />
                </div>
                <div className="w-full md:w-1/2">

                    <p className="py-6 text-justify text-lg">In the tapestry of life, discover unparalleled joy by adopting a pet. In shelters, hearts beat with hope, yearning for a home where wagging tails and loving eyes will flourish. Adopting is more than kindness; it's a transformative journey for both you and your newfound companion. The bond formed through adoption transcends the ordinary; it's a commitment to nurture, protect, and cherish a life grateful for a better tomorrow. Beyond fluffy coats lie stories of resilience—tales of survival, courage, and the unwavering spirit of those who've endured. Pets become confidantes, playmates, and guardians. So, as you ponder welcoming a furry friend, remember: you're not just adopting a pet; you're changing the world for one soul and forever altering your own. </p>
                    <button className="flex btn bg-sky-400 text-white hover:bg-sky-500 rounded-md px-10 mx-auto text-center">Adopt a Pet</button>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;