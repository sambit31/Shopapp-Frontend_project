import axios from "../../api/axiosconfig";
import { loadproduct } from "../reducers/productSlice";
import { toast } from "react-toastify";

// ✅ Fetch all products
export const asyncloadproducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadproduct(data));
  } catch (error) {
    console.error("Error loading products:", error);
    toast.error("Failed to load products!");
  }
};

// ✅ Create a new product
export const asyncreateproduct = (product) => async (dispatch) => {
  try {
    await axios.post("/products", product);
    dispatch(asyncloadproducts());
    toast.success("Product created successfully!");
  } catch (error) {
    console.error("Error creating product:", error);
    toast.error("Failed to create product!");
  }
};

// ✅ Update an existing product
export const asyncupdateproduct = (product) => async (dispatch) => {
  try {
    await axios.patch(`/products/${product.id}`, product);
    dispatch(asyncloadproducts());
    toast.success("Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product!");
  }
};

export const asyncdeleteproduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/products/${product.id}`, product);
    dispatch(asyncloadproducts());
    toast.success("Product delete successfully!");
  } catch (error) {
    console.error("Error delete product:", error);
    toast.error("Failed to delete product!");
  }
};

