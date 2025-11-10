import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncdeleteproduct, asyncupdateproduct } from "../../store/actions/productActions";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Find product by ID (convert id to number if needed)
  const products = useSelector((state) => state.productReducer.products);
  const product = products?.find((p) => p.id == id);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(product || {});

  const DeleteHandler = (id) => {
    dispatch(asyncdeleteproduct(id));
    navigate('/products');
  }

  // ✅ Wait until product is loaded
  if (!product) {
    return (
      <p className="text-center text-gray-600 text-lg mt-20">
        Product not found or still loading...
      </p>
    );
  }

  // ✅ Handle input changes for update
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Update product (via Redux action)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(asyncupdateproduct(formData));
      toast.success("✅ Product updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update product!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8 flex justify-center">
      <div className="bg-gray-500 rounded-2xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-2xl">
        
        {/* ✅ Product Image Section */}
        <div className="md:w-1/2 bg-gray-100 flex justify-center items-center">
          <img
            src={formData.image}
            alt={formData.title}
            className="object-contain h-[400px] p-6 rounded-lg"
          />
        </div>

        {/* ✅ Product Details / Edit Form Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          {!editMode ? (
            <>
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                {product.title}
              </h1>
              <h2 className="text-2xl text-blue-400 font-bold mb-4">
                ₹{product.price}
              </h2>
              <p className="text-black-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex gap-4">
                <button onClick={DeleteHandler} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all">
                  🛒 Delete Product
                </button>

                <button
                  onClick={() => setEditMode(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl font-medium transition-all">
                  ✏️ Update Product
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border-b border-gray-300 p-2 outline-none text-lg focus:border-blue-500"
              />

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border-b border-gray-300 p-2 outline-none text-lg focus:border-blue-500"
              />

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full border-b border-gray-300 p-2 outline-none text-lg focus:border-blue-500"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="w-full border-b border-gray-300 p-2 outline-none text-lg focus:border-blue-500"
              ></textarea>

              <div className="flex gap-4 mt-5">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  ✅ Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl font-medium transition-all"
                >
                  ❌ Cancel
                </button>
              

              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
