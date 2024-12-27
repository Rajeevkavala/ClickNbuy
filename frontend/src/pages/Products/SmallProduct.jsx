import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="text-white w-full sm:w-[20rem] p-3 mx-auto sm:mx-3">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <div className="w-full h-[12rem] overflow-hidden rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
          <HeartIcon product={product} />
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-sm sm:text-base">
            <div className="truncate">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
