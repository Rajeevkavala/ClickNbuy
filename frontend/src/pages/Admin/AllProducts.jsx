import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  // Use refetch to reload the products after updating
  const { data: products ,isLoading, isError, refetch } = useAllProductsQuery();
  // const isLoading = true
  // Loading state with Tailwind skeleton screens
  if (isLoading) {
    return (
      <div className="ml-[10rem] container mx-auto px-4 text-white min-h-screen AllProducts">
        <div className="flex flex-col md:flex-row">
          <div className="p-3 w-full md:w-3/4">
            <div className="ml-8 text-xl font-bold h-12 mb-4">
              All Products (loading...)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Skeleton Loader for each product */}
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="block overflow-hidden rounded-lg bg-gray-800 shadow-md animate-pulse"
                >
                  <div className="flex flex-col">
                    <div className="w-full h-48 bg-gray-700 rounded-t-lg"></div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div className="flex flex-col justify-between">
                        <div className="h-6 w-32 bg-gray-700 rounded"></div>
                        <div className="h-4  mt-3 w-24 bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-10 w-full bg-gray-700 rounded mt-2"></div>
                      <div className="flex flex-col justify-between items-center">
                        <div className="h-8 w-24 bg-gray-700 rounded mt-4"></div>
                        <div className="h-6 w-24 bg-gray-700 rounded mt-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    );
  }

  // Error state with Tailwind styling
  if (isError) {
    return (
      <div className="flex items-center h-[100%] justify-center bg-red-100 text-red-700 p-4 rounded-md shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading products</span>
      </div>
    );
  }

  return (
    <>
      <div className="ml-[10rem] container mx-auto px-4 text-white min-h-screen AllProducts">
        <div className="flex flex-col md:flex-row">
          <div className="p-3 w-full mr-[100px]">
            <div className="ml-8 text-xl font-bold h-12 mb-4">
              All Products ({products.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block overflow-hidden rounded-lg bg-gray-800 shadow-md hover:shadow-lg"
                >
                  <div className="flex flex-col">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div className="flex flex-col justify-between">
                        <h5 className="text-xl font-semibold mb-2 text-white">
                          {product?.name}
                        </h5>
                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 truncate">
                        {product?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex flex-col justify-between items-center">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                          onClick={() => {
                            // Trigger refetch after updating a product (inside the update component)
                            refetch();
                          }}
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p className="text-white">₹ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
            <AdminMenu />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
