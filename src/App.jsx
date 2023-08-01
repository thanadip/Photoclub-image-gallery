import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components

//pages
import Start from "./pages/Start";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/Index";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import Blocked from "./pages/Blocked";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
