import React from "react";
import { Route, Routes } from "react-router-dom";

import Customer from "./pages/Customer";
import Category from "./pages/Categories";
import Inventory from "./pages/Inventory";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Payment from "./pages/Payment";
import Analytics from "./pages/Analytics/Analytics";

import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import EditProduct from "./pages/EditProduct";
import EditInventory from "./pages/EditInventory";

import ProtectedRoute from "./ProtextRoute";

import AddOrder from "./pages/AddOrder";
import EditOrder from "./pages/EditOrder";

import Navbar from "./components/Navbar";
import EditCategory from "./pages/EditCategory";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import Card from "./pages/Cards";
import Checkout from "./pages/CheckOut";
import Footer from "./components/Footer";

function ProtectedLayout() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/customer"
          element={<Customer />}
        />

        <Route
          path="/categories"
          element={<Category />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/product"
          element={<Product />}
        />

        <Route path="/add-product" element={<AddProduct/>}/>

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/addcustomer"
          element={<AddCustomer />}
        />

        <Route
          path="/editcustomer/:id"
          element={<EditCustomer />}
        />

        <Route
          path="/editproduct/:id"
          element={<EditProduct />}
        />

        <Route
          path="/editinventory/:id"
          element={<EditInventory />}
        />

        <Route
          path="/addorder"
          element={<AddOrder />}
        />

        <Route
          path="/editorder/:id"
          element={<EditOrder />}
        />

        <Route
          path="/editcategory/:id"
          element={<EditCategory />}
        />

        <Route path="/addcategory" element={<AddCategory/>}/>

         <Route path="/cartpage" element={<Card/>}/>

         <Route path="/checkout" element={<Checkout/>}/>
      </Routes>

       <Footer/>
    </>
  );
}

export default function Router() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      {/* Website open karte hi Login */}
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgotpassword"
        element={<ForgotPassword />}
      />

      <Route
        path="/resetpassword"
        element={<ResetPassword />}
      />

      <Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

      {/* ================= PROTECTED ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/*"
          element={<ProtectedLayout />}
        />
      </Route>
     
    </Routes>
  );
}