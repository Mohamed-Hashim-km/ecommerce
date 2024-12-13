import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/HomePage";
import ProductInfo from "./screens/ProductInfo";
import ScrollTop from "./scrollTop/ScrollTop";
import CartPage from "./screens/CartPage";
import Login from "./screens/registration/Login";
import Signup from "./screens/registration/Signup";
import UserDashBoard from "./screens/user/UserDashBoard";
import AdminDashboard from "./screens/admin/AdminDashboard";
import AddProducts from "./screens/admin/AddProducts";
import { ProtectedRouteUser } from "./ProtectedRoute/ProtectedRouteUser";
import { ProtectedRouteAdmin } from "./ProtectedRoute/ProtectedRouteAdmin";
import EditeProduct from "./screens/admin/EditeProduct";
import Category from "./screens/Category";
// import ProtectedRouteUser from "./ProtectedRoute/ProtectedRouteUser";


function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productInfo/:id" element={<ProductInfo />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={
          <ProtectedRouteUser><UserDashBoard /></ProtectedRouteUser>} />
        <Route path="/admin-dashboard" element={
          <ProtectedRouteAdmin><AdminDashboard /></ProtectedRouteAdmin>} />
        <Route path="/addProduct" element={<AddProducts />} />
        <Route path="/editeProduct/:id" element={<EditeProduct />} />
        <Route path="/category/:categoryName" element={<Category />} />

        
      </Routes>
      
    </>
  );
}

export default App;
