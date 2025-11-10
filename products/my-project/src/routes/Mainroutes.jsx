import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/Register'
import CreateProduct from '../pages/admin/CreateProduct'
import ProductDetails from '../pages/admin/ProductDetails'
import { useSelector } from 'react-redux'
import UserProfile from '../pages/user/UserProfile'
import EditUser from '../pages/user/EditUser'
import PageNotFound from '../PageNotFound'
import Cart from '../pages/Cart'

const Mainroutes = () => {
  const {users} = useSelector((state)=>state.userReducer);

  return (
    <Routes>
        <Route path='/' element={users ? <Products /> : <Home />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin/user-profile' element={<UserProfile />} />
        <Route path='/admin/user-profile/edit' element={<EditUser />} />


        <Route path='/admin/create-product' element={<CreateProduct />} />
        <Route path='/products/:id' element={<ProductDetails />} />

        <Route path='*' element={<PageNotFound/>}></Route>
        <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default Mainroutes