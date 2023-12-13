

const Category = ({category}) => {
    const {_id,categoryName,categoryImage}=category

    return (
        <div className="card d w-[280px] h-[300px]  shadow-slate-800 shadow-lg rounded-lg bg-center bg-blend-overlay hover:bg-slate-800 cursor-pointer hover:bg-blend-overlay " style={{ backgroundImage: `url(${categoryImage})` }}>
           
            <div className="card-body">
                <h2 className="card-title uppercase mx-auto my-auto text-gray-500 ">{categoryName}</h2>
                  
            </div>
        </div>
    );
};

export default Category;