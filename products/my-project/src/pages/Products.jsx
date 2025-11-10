import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart } from "../store/actions/cartActions";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);  
  const [page, setPage] = useState(1);

  const fetchproducts = async () => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products`);
    const newData = data.slice((page - 1) * 6, page * 6);

    setItems((prev) => [...prev, ...newData]);
    setPage(page + 1);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchproducts();
  }, []);

  const AddtoCartHandler = (product) => {
    dispatch(addProductToCart(product));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-white tracking-wide">
        🛍️ Explore Our Collection
      </h1>

      <div
        id="scrollableDiv"
        style={{
          height: 600,
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchproducts}
          hasMore={true}
          loader={<h4 className="text-center text-white">Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/10 hover:-translate-y-1"
              >
                <div className="w-full h-56 bg-gray-500 flex justify-center items-center overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-full p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-[200px]">
                  <h2 className="text-lg font-semibold text-white truncate">
                    {product.title}
                  </h2>

                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-emerald-400">
                      ₹{product.price}
                    </span>

                    <div className="flex gap-2">
                      <Link
                        to={`/products/${product.id}`}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                      >
                        More Info
                      </Link>

                      <button
                        onClick={() => AddtoCartHandler(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Products;
