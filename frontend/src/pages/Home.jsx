import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Message from "../components/Message";
import Header from "../components/header";
import Product from "./Products/Product";
const ProductSkeletonLoader = () => (
<div className="text-white w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem] p-3 mx-auto sm:mx-3 animate-pulse">

  <div className="relative">
    {/* Skeleton for the image */}
    <div className="w-full h-[10rem] sm:h-[11rem] md:h-[13rem] lg:h-[15rem] overflow-hidden rounded bg-gray-300"></div>
    
    {/* Skeleton for the heart icon */}
    <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2"></div>
  </div>

  <div className="p-4 flex flex-row gap-6">
    {/* Skeleton for the name */}
    <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
    
    {/* Skeleton for the price */}
    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  </div>
</div>
);


const Home = () => {
  const { keyword } = useParams();
  const { data,isLoading, isError } = useGetProductsQuery({ keyword });
  // const isLoading=true;
  return (
    <div className="width-full">
      <h1 className="text-white mb-[1rem] text-4xl ml-[8rem] underline Top-Featured-Products">
        Top Featured Products
      </h1>
      {!keyword ? <Header /> : null}

      {isLoading ? (
        
        <div className="px-4 lg:px-16 mt-8">
          {/* Skeleton for Heading and Button (side by side) */}
          <div className="flex sketon-loading-for-Special-Products ml-[4rem] justify-between items-center mb-4">
            {/* Skeleton for Heading */}
            <div className="h-16 bg-gray-300 rounded w-[30%]"></div>   
            {/* Skeleton for Button */}
            <div className="h-12 button-skelton mr-[4rem] bg-gray-300 rounded-3xl w-[10%]"></div>
          </div>
          {/* Display skeleton loaders while products are loading */}
          <div className="grid sketon-loading-for-Special-Products ml-[3rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <ProductSkeletonLoader />
              </div>
            ))}
          </div>
        </div>
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row text-white justify-between items-center px-4 lg:px-16 mt-8">
            <h1 className="Special-Products text-[2rem] ml-[2rem] lg:text-[3rem] 2xl:mr-[3rem] mb-4 lg:mb-0">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-6 lg:px-10 text-center"
            >
              Shop
            </Link>
          </div>
          <div className="px-4 text-white lg:px-16 mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
