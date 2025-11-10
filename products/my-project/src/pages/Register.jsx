import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncregisteruser } from "../store/actions/userActions";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const RegisterHandler = async (data) => {
    let uploadedImage = "";

    if (data.imageUrl) uploadedImage = data.imageUrl;
    if (file) uploadedImage = await uploadToCloudinary(file);

    const newUser = {
      id: nanoid(),
      username: data.username,
      email: data.email,
      password: data.password,
      image: uploadedImage || "",
      isAdmin: false,
      cart:[]
    };

    dispatch(asyncregisteruser(newUser));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900 p-6">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(RegisterHandler)} className="space-y-4">

          <input
            {...register("username")}
            className="w-full p-3 bg-white/20 text-white rounded-lg outline-none placeholder-gray-200"
            placeholder="Username"
          />

          <input
            {...register("email")}
            type="email"
            className="w-full p-3 bg-white/20 text-white rounded-lg outline-none placeholder-gray-200"
            placeholder="Email"
          />

          <input
            {...register("password")}
            type="password"
            className="w-full p-3 bg-white/20 text-white rounded-lg outline-none placeholder-gray-200"
            placeholder="Password"
          />

          {/* Image Inputs */}
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-1/2 bg-white/20 text-white p-2 rounded-lg"
            />
            <input
              {...register("imageUrl")}
              className="w-1/2 bg-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-200"
              placeholder="Paste Image URL"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200"
          >
            Register 🚀
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
