import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
import CombinedSkeletonLoader from "./SkeletonLoader";

const Header = () => {
  const { data,isLoading,error } = useGetTopProductsQuery();
  // const isLoading = true;
  if (isLoading) {
    return <CombinedSkeletonLoader />;
  }

  if (error) {
    return <h1 className="text-red-500">ERROR: {error.message}</h1>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between sm:ml-0 lg:ml-[3rem] lg:items-start px-4 lg:px-8 gap-6">
      {/* Small Products Section */}
      <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {data.map((product) => (
          <div key={product._id}>
            <SmallProduct product={product} />
          </div>
        ))}
      </div>

      {/* Product Carousel Section */}
      <div className="w-full lg:w-1/2">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
