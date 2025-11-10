import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducers/userSlice"; // import your redux action (make sure you have this)
import {toast} from "react-toastify"

// ✅ Login existing user (optional API call)
export const asyncloginuser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/users?email=${user.email}&password=${user.password}`);
    if (data.length > 0) {
      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(loaduser(data[0]));
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password!");
    }
  } catch (error) {
    console.log("Error logging in user:", error);
    toast.error("Login failed!");
  }
};

export const asynclogoutuser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
    toast.success("Logged out successfully!");
  } catch (error) {
    console.log("Error logging out user:", error);
  }
};

export const asyncurrentuser = (user) => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loaduser(user));
    else console.log("user Not Found");
  } catch (error) {
    console.log("Error logging in user:", error);
  }
};

// ✅ Register new user
export const asyncregisteruser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    console.log("User registered:", res.data);

    // Save new user to redux store
    dispatch(loaduser(res.data));
  } catch (error) {
    toast.alert("error")
    console.log("Error registering user:", error);
  }
};

// ✅ Update User
export const asyncupdateuser = (updatedData) => async (dispatch, getState) => {
  try {
    const state = getState();
    const currentUser = state.userReducer.users;

    if (!currentUser?.id) {
      toast.error("User not logged in!");
      return;
    }
    const userId = currentUser.id;
    const { data } = await axios.patch(`/users/${userId}`, updatedData);

    localStorage.setItem("user", JSON.stringify(data));
    dispatch(loaduser(data));

    toast.success("Profile updated ✅");
  } catch (error) {
    console.log("Error updating user:", error);
    toast.error("Failed to update profile ❌");
  }
};