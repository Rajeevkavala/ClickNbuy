// Skeleton Loader component for the product (Left Side)
const ProductSkeletonLoader = () => (
    <div className="grid ml-[4rem] ProductSkeletonLoader grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {/* Skeleton Loader 1 */}
      <div className="text-white w-full sm:w-[20rem] p-3 mx-auto sm:mx-3 animate-pulse">
        <div className="relative">
          {/* Skeleton for the image */}
          <div className="w-full h-[12rem] overflow-hidden rounded bg-gray-300"></div>
          {/* Skeleton for the heart icon */}
          <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2"></div>
        </div>
        <div className="p-4">
          {/* Skeleton for the name */}
          <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
          {/* Skeleton for the price */}
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
  
      {/* Skeleton Loader 2 */}
      <div className="text-white w-full sm:w-[20rem] p-3 mx-auto sm:mx-3 animate-pulse">
        <div className="relative">
          {/* Skeleton for the image */}
          <div className="w-full h-[12rem] overflow-hidden rounded bg-gray-300"></div>
          {/* Skeleton for the heart icon */}
          <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2"></div>
        </div>
        <div className="p-4">
          {/* Skeleton for the name */}
          <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
          {/* Skeleton for the price */}
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
  
      {/* Skeleton Loader 3 */}
      <div className="text-white w-full sm:w-[20rem] p-3 mx-auto sm:mx-3 animate-pulse">
        <div className="relative">
          {/* Skeleton for the image */}
          <div className="w-full h-[12rem] overflow-hidden rounded bg-gray-300"></div>
          {/* Skeleton for the heart icon */}
          <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2"></div>
        </div>
        <div className="p-4">
          {/* Skeleton for the name */}
          <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
          {/* Skeleton for the price */}
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
  
      {/* Skeleton Loader 4 */}
      <div className="text-white w-full sm:w-[20rem] p-3 mx-auto sm:mx-3 animate-pulse">
        <div className="relative">
          {/* Skeleton for the image */}
          <div className="w-full h-[12rem] overflow-hidden rounded bg-gray-300"></div>
          {/* Skeleton for the heart icon */}
          <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2"></div>
        </div>
        <div className="p-4">
          {/* Skeleton for the name */}
          <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
          {/* Skeleton for the price */}
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
  
  // Skeleton Loader component for the carousel (Right Side)
  const CarouselSkeletonLoader = () => (
    <div className="p-4 animate-pulse w-full max-w-6xl mx-auto sm:w-[90%] md:w-[85%] lg:w-[75%]">
      {/* Skeleton for Image */}
      <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem] bg-gray-300 rounded-lg mb-4"></div>
  
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
        {/* Skeleton for Left Section */}
        <div className="one mb-4 sm:mb-0 sm:w-[60%]">
          <div className="h-6 bg-gray-300 rounded mb-2"></div> {/* Skeleton for Title */}
          <div className="h-8 bg-gray-300 rounded mb-2 w-1/2"></div> {/* Skeleton for Price */}
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div> {/* Skeleton for Description */}
        </div>
  
        {/* Skeleton for Right Section */}
        <div className="two flex flex-wrap gap-4 sm:w-[35%]">
          <div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div> {/* Skeleton for Review */}
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div> {/* Skeleton for Rating */}
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div> {/* Skeleton for Additional Info */}
          </div>
  
          <div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div> {/* Skeleton for Additional Info */}
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div> {/* Skeleton for Additional Info */}
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div> {/* Skeleton for Additional Info */}
          </div>
        </div>
      </div>
    </div>
  );
  
  // Combined Skeleton Loader (Left and Right sections side by side)
  const CombinedSkeletonLoader = () => (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Left Side: Product Skeleton Loader */}
      <div className="w-full sm:w-[50%]">
        <ProductSkeletonLoader />
      </div>
  
      {/* Right Side: Carousel Skeleton Loader */}
      <div className="w-full sm:w-[50%]">
        <CarouselSkeletonLoader />
      </div>
    </div>
  );
  
  export default CombinedSkeletonLoader;
  