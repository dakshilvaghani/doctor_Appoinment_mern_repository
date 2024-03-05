import React from "react";
import Home from "../pages/Home";
import Doctors from "./../../src/pages/doctor/Doctors";
import DoctorDetail from "../pages/doctor/DoctorDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Service from "../pages/Service";
import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctordetail" element={<DoctorDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Service" element={<Service />} />
    </Routes>
  );
};

export default Routers;
