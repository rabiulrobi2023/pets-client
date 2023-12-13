import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Categories from "../Categories/Categories";
import Introduce from "../Introduce/Introduce";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <CallToAction></CallToAction>
            <Introduce></Introduce>
            
        </div>
    );
};

export default Home;