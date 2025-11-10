import { useEffect } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asyncurrentuser } from "./store/actions/userActions";
import { asyncloadproducts } from "./store/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.userReducer);
  const { products } = useSelector(state => state.productReducer);

  useEffect(() => {
    if (!user) {
      dispatch(asyncurrentuser());
    }
  }, [user]);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(asyncloadproducts());
    }
  }, [products]);

  return (
    <div className="text-white font-thin w-screen h-screen bg-gray-800">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
