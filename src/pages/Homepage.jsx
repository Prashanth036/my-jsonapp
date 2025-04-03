import { useEffect, useState } from "react";
import Products from "../services/productService";
import { Paginator } from "primereact/paginator";
import { Card } from "primereact/card";
import { useDispatch } from "react-redux";
import { addProducts } from "../rtkstore/productSlice";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
    const [getProducts, setGetProducts] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await Products.getFirstPageProducts();
            setGetProducts(response.data);
        } catch (error) {
            setError("Failed to load products. Please try again.");
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const onPageChange = async (event) => {
        setFirst(event.first);
        setRows(event.rows);
        setIsLoading(true);
        setError(null);
        try {
            const response = await Products.getProducts(event.first);
            setGetProducts(response.data);
        } catch (error) {
            setError("Failed to load products. Please try again.");
            console.error("Pagination error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    function showProduct(ele) {
        dispatch(addProducts(ele));
        navigate(`/product/${ele.id}`);
    }

    return (
        <div className="p-4 my-10">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                Featured <span className="text-sky-600">Products</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2 mb-6 rounded-full"></div>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="text-center">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button 
                        onClick={getData} 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {getProducts.length !== 0 &&
                            getProducts.products.map((ele, index) => (
                                <button key={index} onClick={() => showProduct(ele)}>
                                    <Card className="shadow-lg border border-gray-200 rounded-lg bg-white transition-transform transform hover:scale-105">
                                        <img
                                            src={ele.images[0]}
                                            alt={ele.title}
                                            className="w-[80%] mx-auto h-[200px] object-cover rounded-md"
                                        />
                                        <div className="mt-4 text-lg font-semibold text-gray-900 text-center">
                                            {ele.title}
                                        </div>
                                        <div className="text-xl font-bold text-green-600 text-center mt-2">
                                            ${ele.price}
                                        </div>
                                    </Card>
                                </button>
                            ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <Paginator
                            first={first}
                            rows={20}
                            totalRecords={getProducts.total}
                            onPageChange={onPageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
