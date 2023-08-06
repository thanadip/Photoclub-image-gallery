import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components

//pages
import Start from "./pages/Non-User/Start";
import Contact from "./pages/Non-User/Contact";
import About from "./pages/Non-User/About";
import Register from "./pages/Non-User/Register";
import Login from "./pages/Non-User/Login";
import Index from "./pages/Non-User/Index";
import UserHome from "./pages/User/UserHome";
import AdminHome from "./pages/Admin/AdminHome";
import Blocked from "./pages/Non-User/Blocked";
import AdminContact from "./pages/Admin/AdminContact";
import UserContact from "./pages/User/UserContact";
import AdminUsers from "./pages/Admin/AdminUsers";
import UserImage from "./pages/User/UserImage";
import AdminImages from "./pages/Admin/AdminImages";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/index" element={<Index />}/>
        <Route path="/user" element={<UserHome />}/>
        <Route path="/admin" element={<AdminHome />}/>
        <Route path="/blocked" element={<Blocked />}/>
        <Route path="/adminContact" element={<AdminContact />}/>
        <Route path="/userContact" element={<UserContact />}/>
        <Route path="/user-display" element={<AdminUsers />}/>
        <Route path="/image-display" element={<UserImage />}/>
        <Route path="/admin-image" element={<AdminImages />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
