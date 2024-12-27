// Skeleton Loader Component
const ProductCardSkeletonLoader = () => (
  <div className="max-w-sm bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 animate-pulse">
    <div className="relative">
      <div className="bg-gray-500 h-40 w-full rounded-md"></div>
      <div className="absolute bottom-3 right-3 bg-gray-500 h-5 w-24 rounded-full"></div>
    </div>
    <div className="p-5">
      <div className="flex justify-between">
        <div className="bg-gray-500 h-6 w-32 rounded"></div>
        <div className="bg-gray-500 h-6 w-24 rounded"></div>
      </div>
      <div className="bg-gray-500 h-4 w-3/4 mt-3 rounded"></div>
      <div className="flex justify-between items-center mt-5">
        <div className="bg-gray-500 h-8 w-24 rounded"></div>
        <div className="bg-gray-500 h-8 w-8 rounded-full"></div>
      </div>
    </div>
  </div>
);
export default ProductCardSkeletonLoader;