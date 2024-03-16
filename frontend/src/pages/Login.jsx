import React from "react";
import { useState, useContext } from "react";
import { BASE_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/Authcontext";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "", // Added a missing single quote
  });

  const [loading, setLoading] = useState("false");

  const Navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      Navigate("/home");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto p-10 rounded-lg shadow-md ">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back
        </h3>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066FF61] focus:outline-none
  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
  placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066FF61] focus:outline-none
  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
  placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-2"
            >
              {!loading ? <HashLoader size={25} color="#fff" /> : "Log in"}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don't have an account?
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
