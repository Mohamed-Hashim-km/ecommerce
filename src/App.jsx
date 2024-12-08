import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/HomePage";
import ProductInfo from "./screens/ProductInfo";
import ScrollTop from "./scrollTop/ScrollTop";
import CartPage from "./screens/CartPage";
import AllProduct from "./screens/AllProduct";
import Login from "./screens/registration/Login";
import Signup from "./screens/registration/Signup";
import UserDashBoard from "./screens/user/UserDashBoard";
import AdminDashboard from "./screens/admin/AdminDashboard";
import AddProducts from "./screens/admin/AddProducts";
import UpdateProduct from "./screens/admin/UpdateProduct";

function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productInfo" element={<ProductInfo />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDashBoard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/addProduct" element={<AddProducts />} />
        <Route path="/updateProduct" element={<UpdateProduct />} />



      </Routes>
    </>
  );
}

export default App;
