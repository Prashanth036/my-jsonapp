import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProductDetail = () => {
  const { product } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      navigate("/homepage");
    }
  }, [product, navigate]);

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 my-8 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 flex justify-center">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-[80%] h-[400px] object-cover rounded-md shadow-md"
        />
      </div>

      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{product.title}</h1>
          <p className="text-gray-700 mt-2 text-lg">{product.description}</p>

          <div className="mt-4">
            <p className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
              <span className="text-sm text-red-500 ml-2">({product.discountPercentage}% OFF)</span>
            </p>
            <p className="text-lg text-gray-800 mt-2 font-medium">Brand: <span className="text-gray-600">{product.brand}</span></p>
            <p className="text-lg text-gray-800 font-medium">Category: <span className="text-gray-600">{product.category}</span></p>
            <p className="text-lg text-gray-800 font-medium">SKU: <span className="text-gray-600">{product.sku}</span></p>
            <p className="text-lg text-gray-800 font-medium">Stock: <span className="text-gray-600">{product.stock} units</span></p>
            <p className="text-lg text-red-600 font-semibold">Availability: {product.availabilityStatus}</p>
          </div>

          <div className="mt-4">
            <p className="text-lg text-gray-800 font-medium">Return Policy: <span className="text-gray-600">{product.returnPolicy}</span></p>
            <p className="text-lg text-gray-800 font-medium">Shipping: <span className="text-gray-600">{product.shippingInformation}</span></p>
            <p className="text-lg text-gray-800 font-medium">Warranty: <span className="text-gray-600">{product.warrantyInformation}</span></p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <button className="w-full bg-yellow-500 text-black px-5 py-3 rounded-md text-lg font-semibold hover:bg-green-600 transition duration-300">
            Buy Now
          </button>
          <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
