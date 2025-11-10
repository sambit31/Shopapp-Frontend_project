import { nanoid } from 'nanoid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncreateproduct } from '../../store/actions/productActions';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CreateProductHandler = (product) => {
    product.id = nanoid();

    if (!product.title || !product.price || !product.image || !product.description) {
      toast.error("Please fill in all fields!");
      return;
    }

    dispatch(asyncreateproduct(product));
    toast.success("Product created successfully!");
    reset();
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex justify-center items-center  bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-6 py-10">
      <form
        onSubmit={handleSubmit(CreateProductHandler)}
        className="bg-white/10 text-white font-bold shadow-lg rounded-2xl p-8 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          🛒 Create New Product
        </h2>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-white-300 font-medium mb-2">Image URL</label>
          <input
            {...register('image')}
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-white-300 font-medium mb-2">Title</label>
          <input
            {...register('title')}
            type="text"
            placeholder="Enter product title"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-white-300 font-medium mb-2">Price (₹)</label>
          <input
            {...register('price')}
            type="number"
            placeholder="Enter price"
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-white-300 font-medium mb-2">Category</label>
          <input
            {...register('category')}
            type="text"
            placeholder="e.g. Electronics, Fashion, etc."
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-white-300 font-medium mb-2">Description</label>
          <textarea
            {...register('description')}
            rows="4"
            placeholder="Enter product description..."
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-200"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
