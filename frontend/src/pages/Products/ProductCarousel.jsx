import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  // Configure the settings for smooth sliding and fade effect
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,  // Enable fade transition
    cssEase: 'ease-in-out',  // Smooth easing for transitions
    pauseOnHover: true,  // Pause autoplay when hovered
  };

  return (
    <div className="mb-4 text-white">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="w-full max-w-6xl mx-auto sm:w-[90%] md:w-[85%] lg:w-[75%]"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem] rounded-lg object-cover transition-transform duration-500 ease-in-out transform"
                />

                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                  <div className="one mb-4 sm:mb-0 sm:w-[60%]">
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p className="text-xl font-semibold text-pink-500">₹ {price}</p>
                    <p className="mt-4 text-sm text-gray-300">
                      {description.substring(0, 170)} ...
                    </p>
                  </div>

                  <div className="two flex flex-wrap gap-4 sm:w-[35%]">
                    <div>
                      <h1 className="flex items-center text-sm">
                        <FaStore className="mr-2 text-white" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center text-sm mt-2">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center text-sm mt-2">
                        <FaStar className="mr-2 text-white" /> Reviews: {numReviews}
                      </h1>
                    </div>

                    <div>
                      <h1 className="flex items-center text-sm">
                        <FaStar className="mr-2 text-white" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center text-sm mt-2">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center text-sm mt-2">
                        <FaBox className="mr-2 text-white" /> In Stock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
