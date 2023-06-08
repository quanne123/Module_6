import './App.css';
import OutletWrapper from "./router/OutletWraper";
import React from "react";
import Home from "./components/Home";
import {Route, Routes} from "react-router";
import Login from "./components/Login";
import Cart from "./components/Cart";
import CartDetails from "./components/PurchasedCartDetails";
import FoodDetail from "./components/FoodDetail";
import Payment from "./components/Payment";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import UserProfileEdit from "./components/UserProfileEdit";

function App() {
  return (
      <>
        <Routes>

          <Route path="/" element={<OutletWrapper/>}>
            <Route index element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path="/food-detail/:id" element={<FoodDetail />} />
              <Route path="/cart-detail" element={<CartDetails />} />
              <Route path="/profile" element={<UserProfile />} />
              {/*<Route path="/profile-edit" element={<UserProfileEdit />} />*/}


          </Route>
            <Route path="/payment-info" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

        </Routes>
       {/*<Food/>*/}
      </>
  );
}

export default App;