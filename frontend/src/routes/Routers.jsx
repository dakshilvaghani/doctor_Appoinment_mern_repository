import React from "react";
import Home from "../pages/Home";
import Doctors from "./../../src/pages/doctor/Doctors";
import DoctorDetail from "../pages/doctor/DoctorDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Service from "../pages/Service";
import MyAccount from "../Dashboard/user account/MyAccount";
import Dashboard from "../Dashboard/doctor account/Dashboard";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Services" element={<Service />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
