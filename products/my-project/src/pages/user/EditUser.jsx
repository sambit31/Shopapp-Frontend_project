import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const EditUser = () => {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const user = useSelector((state) => state.userReducer.users);

  const onSubmit = async (data) => {
    let imageToUpload = user.image;

    // if user pasted URL
    if (data.imageUrl) {
      imageToUpload = data.imageUrl;
    }

    // if user selected file
    if (file) {
      imageToUpload = await uploadToCloudinary(file);
    }

    const updatedUser = { ...user, ...data, image: imageToUpload, };

    dispatch(asyncupdateuser(updatedUser));
    navigate("/admin/user-profile");
  };

  if (!user) return <h1 className="text-white text-center">Login first...</h1>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900 p-6">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-full max-w-lg">

        <h2 className="text-2xl text-white text-center mb-5">Edit Profile</h2>

        <div className="flex justify-center mb-6">
          <img
            src={user.image || "https://i.pravatar.cc/150"}
            className="w-24 h-24 rounded-full border shadow"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input {...register("username")} defaultValue={user.username}
            className="w-full p-3 bg-white/20 text-white rounded"
            placeholder="Username" />

          <input {...register("email")} defaultValue={user.email}
            className="w-full p-3 bg-white/20 text-white rounded"
            placeholder="Email" />

          {/* File Upload */}
          <div className="flex gap-4">

            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-1/2 rounded-2xl p-3 bg-white/10 text-white"
            />

            {/* Image URL */}
            <input
              {...register("imageUrl")}
              className="w-1/2 rounded-2xl p-3 bg-white/20 text-white"
              placeholder="Paste Image URL"
            />

          </div>
          <button type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded mt-3">
            Save Changes ✅
          </button>
        </form>

        <button onClick={() => navigate(-1)}
          className="w-full p-3 bg-gray-600 text-white rounded mt-3">
          Cancel ❌
        </button>
      </div>
    </div>
  );
};

export default EditUser;
