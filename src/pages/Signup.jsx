import React, { useState } from "react";
import signupImg from "./../assets/images/signup.gif";
// import avatar from "./../assets/images/avatar-icon.png";
import { Link } from "react-router-dom";
const Signup = () => {
  // const [selectedFile, setselectedFile] = useState(null);
  // const [previewURL, setpreviewURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    role: "patient", // Added a missing single quote
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const fileContent = await readFileAsync(selectedFile);
        console.log(fileContent);
        // Do something with the file content
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file); // Use readAsDataURL for binary data
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image box */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt="Signup Image"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>

          {/* Sign up form */}
          <div className="rounded-1lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Your fullname"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none
  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
  placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none
  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
  placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter Your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none
  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
  placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select option</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </select>
                </label>
              </div>

              <div className="relative w-[130px] h-[50px]">
                <input
                  type="file"
                  name="photo"
                  id="customFile"
                  accept=".jpg, .png"
                  onChange={handleFileInputChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customFile"
                  className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[@.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                >
                  Upload Photo
                </label>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  onChange={submitHandler}
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-2"
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                If You have an account?
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
