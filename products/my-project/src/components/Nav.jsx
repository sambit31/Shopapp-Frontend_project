import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asynclogoutuser } from "../store/actions/userActions";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutHandler = () => {
    dispatch(asynclogoutuser());
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-lg transition-all duration-300 ${
      isActive
        ? "bg-white text-blue-900 font-semibold shadow-md"
        : "text-white hover:bg-white/20 hover:text-white"
    }`;

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-blue-950 shadow-md rounded-b-xl">

      <NavLink className="text-2xl font-bold text-white" to={"/"}>
        🛍️ ShopApp
      </NavLink>

      <div className="flex items-center gap-6">

        <NavLink to="/" className={linkClasses}>Home</NavLink>

        {!user ? (
          <>
            <NavLink to="/login" className={linkClasses}>Login</NavLink>
            <NavLink to="/register" className={linkClasses}>Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/admin/create-product" className={linkClasses}>Create Product</NavLink>
            <NavLink to="/admin/user-profile" className={linkClasses}>Settings</NavLink>
            <NavLink to="/cart" className={linkClasses}>Cart 🛒</NavLink>

            {/* Profile Image */}
            <img
              src={user.image || "https://i.pravatar.cc/40"}
              alt="profile"
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => navigate("/admin/user-profile")}
            />

            <button
              onClick={LogoutHandler}
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
