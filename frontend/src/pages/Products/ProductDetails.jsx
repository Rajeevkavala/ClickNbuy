import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";

import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

// Skeleton loader for Product Details
const ProductDetailsSkeletonLoader = () => (
  <div className="flex h-[100vh] flex-col lg:flex-row flex-wrap text-white items-center lg:items-start lg:justify-between mt-6 lg:mt-[2rem] px-4 lg:px-[3rem]">
    {/* Skeleton for Image */}
    <div className="flex flex-col items-center lg:items-start lg:ml-[3rem]">
      <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[35rem] xl:w-[40rem] h-[20rem] bg-gray-300 animate-pulse rounded-lg mb-4 lg:mb-0"></div>
    </div>

    {/* Skeleton for Product Details */}
    <div className="flex flex-col lg:w-[50%]">
      <div className="h-8 bg-gray-300 animate-pulse mb-4 w-3/4"></div> {/* Name Skeleton */}
      <div className="h-4 bg-gray-300 animate-pulse mb-4 w-5/6"></div> {/* Description Skeleton */}
      <div className="h-10 bg-gray-300 animate-pulse mb-4 w-1/4"></div> {/* Price Skeleton */}

      {/* Product Info Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-2/3"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-300 animate-pulse mb-2 w-1/3"></div>
        </div>
      </div>

      {/* Skeleton for Quantity Selector */}
      <div className="h-10 bg-gray-300 animate-pulse mb-4 w-20"></div>

      {/* Skeleton for Add to Cart Button */}
      <div className="h-10 bg-pink-300 animate-pulse mb-4 w-32 rounded-lg"></div>
    </div>

    {/* Skeleton for Tabs */}
    <div className="w-full mt-6 lg:mt-10 lg:ml-[3rem]">
      <div className="h-10 bg-gray-300 animate-pulse mb-4 w-1/2"></div>
      <div className="h-10 bg-gray-300 animate-pulse mb-4 w-3/4"></div>
    </div>
  </div>
);

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
// const isLoading = true;
  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart successfully");
    navigate("/cart");
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-4 md:ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <ProductDetailsSkeletonLoader /> // Show skeleton loader while loading
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col lg:flex-row flex-wrap text-white items-center lg:items-start lg:justify-between mt-6 lg:mt-[2rem] px-4 lg:px-[3rem]">
          {/* Image and Heart Icon */}
          <div className="flex flex-col items-center lg:items-start lg:ml-[3rem]">
            <img
              src={product.image}
              alt={product.name}
              className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[35rem] xl:w-[40rem] mb-4 lg:mb-0"
            />
            <HeartIcon product={product} className="HeartIcon"/>
          </div>

          {/* Product Details */}
          <div className="flex flex-col lg:w-[50%]">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="my-4 text-gray-400">{product.description}</p>
            <p className="text-4xl lg:text-5xl my-4 font-extrabold">
              ₹ {product.price}
            </p>

            {/* Product Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h1 className="flex items-center">
                  <FaStore className="mr-2" /> Brand: {product.brand}
                </h1>
                <h1 className="flex items-center">
                  <FaClock className="mr-2" /> Added:{" "}
                  {moment(product.createAt).fromNow()}
                </h1>
                <h1 className="flex items-center">
                  <FaStar className="mr-2" /> Reviews: {product.numReviews}
                </h1>
              </div>
              <div>
                <h1 className="flex items-center">
                  <FaStar className="mr-2" /> Ratings: {product.rating}
                </h1>
                <h1 className="flex items-center">
                  <FaShoppingCart className="mr-2" /> Quantity: {product.quantity}
                </h1>
                <h1 className="flex items-center">
                  <FaBox className="mr-2" /> In Stock: {product.countInStock}
                </h1>
              </div>
            </div>

            {/* Quantity Selector */}
            {product.countInStock > 0 && (
              <div>
                <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                <div className="flex items-center mb-5 mt-3">
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 rounded-lg text-black"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="bg-pink-600 text-white py-2 px-4 rounded-lg"
            >
              Add To Cart
            </button>
          </div>

          {/* Tabs */}
          <div className="w-full mt-6 lg:mt-10 lg:ml-[3rem]">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
