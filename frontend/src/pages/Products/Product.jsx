import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[20rem] md:w-[25rem] ml-[1rem] sm:ml-[2rem] p-3 relative">
      <Link to={`/product/${product._id}`}>
        <div className="relative">
          <div className="w-full h-[15rem] overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
          <HeartIcon product={product} />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
