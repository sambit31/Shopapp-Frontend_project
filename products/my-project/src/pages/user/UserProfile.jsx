import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asynclogoutuser, asyncupdateuser } from "../../store/actions/userActions";

const UserProfile = () => {
  const user = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(asyncupdateuser());
    navigate("/admin/user-profile/edit")
  }

  const handleLogout = () => {
    dispatch(asynclogoutuser());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        Please Login to view Profile
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#13131a] via-[#0d1117] to-[#141e30] p-6">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={user.image || "https://i.pravatar.cc/200"}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <h2 className="mt-4 text-2xl font-semibold text-white">{user.name}</h2>
          <p className="text-gray-300 text-sm">@{user.username || "user"}</p>
        </div>

        {/* User Details */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-xl">
          <div className="mb-2">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Role</p>
            <p className="text-white font-medium">{user.role || "User"}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button onClick={handleEdit} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-all">
            ✏️ Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
