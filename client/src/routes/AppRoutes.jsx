import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages Import
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Men from "../pages/Men";
// import Women from "../pages/Women";
import NewArrivals from "../pages/NewArrivals";
import Sale from "../pages/Sale";

import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Auth from "../pages/Auth";
import AdminProducts from "../pages/AdminProducts";
import UserManagement from "../pages/UserManagement";

import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import AdminCategories from "../pages/AdminCategories";
import AdminOrders from "../pages/AdminOrders";
import ProductDetail from "../pages/ProductDetail";
import WomensDresses from "../pages/WomensDresses";
import Clothing from "../pages/Clothing";
import Footwear from "../pages/Footwear";
import BagsAccessories from "../pages/BagsAccessories";
import Watches from "../pages/Watches";
import Jewellery from "../pages/Jewellery";
import Beauty from "../pages/Beauty";
import HomeLiving from "../pages/HomeLiving";
import Lookbook from "../pages/Lookbook";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/men" element={<Men />} />
      {/* <Route path="/women" element={<Women />} /> */}
      <Route path="/new-arrivals" element={<NewArrivals />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      

      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Auth />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/women" element={<WomensDresses />} />
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/footwear" element={<Footwear />} />
      <Route path="/bagsAccessories" element={<BagsAccessories />} />
      <Route path="/watches" element={<Watches />} />
      <Route path="/jewellery" element={<Jewellery />} />
      <Route path="/beauty" element={<Beauty />} />
      <Route path="/homeLiving" element={<HomeLiving />} />
      <Route path="/lookbook" element={<Lookbook />} />
      <Route path="/404" element={<NotFound />} />


    </Routes>
  );
};

export default AppRoutes;
