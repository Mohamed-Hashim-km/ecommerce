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
import AllProducts from "./components/AllProducts";
import ProductInformation from "./screens/admin/ProductInformation";
import UserOrderDetails from "./screens/admin/UserOrderDetails";
import UserAdress from "./screens/user/UserAdress";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


function App() {


  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="allProducts" element={<AllProducts />} />
        <Route path="/productInfo/:id" element={<ProductInfo />} />
        <Route path="/productInformation/:id" element={<ProductInformation />} />
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
        <Route path="/UserOrderDetails/:id" element={<UserOrderDetails />} />
        <Route path="/UserAdress" element={<UserAdress />} />


        
      </Routes>
      
    </>
  );
}

export default App;
