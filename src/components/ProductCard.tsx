import { FaShoppingCart, FaStar, FaTags } from "react-icons/fa";

export const ProductCard = ({ product, getTypeColor }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl border border-gray-100">
    <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
      <img
        src={product.thumbnail.imageUrl}
        alt={product.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-5 space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(
            product.type
          )} flex items-center space-x-1`}
        >
          <FaTags className="w-3 h-3" /> <span>{product.type}</span>
        </span>
        <span className="flex items-center text-yellow-500 font-semibold">
          <FaStar className="w-4 h-4 mr-1" /> {product.avgRating.toFixed(1)}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3">
        {product.description}
      </p>

      <div className="flex justify-between items-center pt-3 border-t mt-3">
        <span className="text-2xl font-extrabold text-teal-500">
          {product.isFree ? "FREE" : `$${product.price.toFixed(2)}`}
        </span>
        <button className="py-2 px-4 text-sm font-semibold bg-teal-400 text-white rounded-full hover:bg-teal-500 transition duration-300 flex items-center space-x-1">
          <FaShoppingCart className="w-4 h-4" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  </div>
);
