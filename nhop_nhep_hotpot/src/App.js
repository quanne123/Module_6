import logo from './logo.svg';
import './App.css';
import OutletWrapper from "./router/OutletWraper";
import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Food from "./components/Food";
import {Route, Routes} from "react-router";
import Login from "./components/Login";

function App() {
  return (
      <>
        <Routes>
            <Route path="/login" element={<Login />} />
          <Route path="/" element={<OutletWrapper/>}>
            <Route index element={<Home />} />
            {/*<Route path="/food" element={<List/>} />*/}
            {/*<Route path="/food-detail/:id" element={<Detail/>} />*/}
            {/*<Route path="/pay" element={<Pay />} />*/}
          </Route>
        </Routes>
       {/*<Food/>*/}
      </>
  );
}

export default App;