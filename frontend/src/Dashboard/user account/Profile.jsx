import HashLoader from "react-spinners/HashLoader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadcloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  const Navigate = useNavigate();

  useEffect(() => {
    setFormData(
      {
        name: user.name,
        email: user.email,
        photo: user.photo, // Assuming user has a 'photo' property
        gender: user.gender,
        bloodType: user.bloodType,
      },
      [user]
    );
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const selectedFile = event.target.files[0];
    const data = await uploadImageToCloudinary(selectedFile);
    console.log(data);
    // setSelectedFile(data.url);
    // setFormData({ photo: data.url });

    // if (selectedFile) {
    //   try {
    //     const fileContent = await readFileAsync(selectedFile);
    //     console.log(fileContent);
    //     // Do something with the file content
    //   } catch (error) {
    //     console.error("Error reading file:", error);
    //   }
    // }
  };

  // const readFileAsync = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = (event) => {
  //       resolve(event.target.result);
  //     };

  //     reader.onerror = (error) => {
  //       reject(error);
  //     };

  //     reader.readAsText(file); // Use readAsDataURL for binary data
  //   });
  // };

  const submitHandler = async (event) => {
    alert("Submit button clicked");
    console.log("Form Data:", formData);
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(res);

      if (!res.ok) {
        throw new Error(await res.json());
      }

      const message = await res.json();
      setLoading(false);
      toast.success(message);
      Navigate("/users/profile/me");
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error("An error occurred during registration");
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Enter Your fullname"
            name="name"
            value={formData.name}
            autoComplete="name"
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
            autoComplete="email"
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none
focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
placeholder:text-textColor rounded-md cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Enter Your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            className="w-full px-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none
focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            autoComplete="new-password"
            className="w-full px-4 py-3 border-b border-solid border-[#0066FF61] focus:outline-none
focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
placeholder:text-textColor rounded-md cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Select option</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Others</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            </figure>
          )}
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
            {selectedFile ? selectedFile.name : "Upload Photo"}
          </label>
        </div>

        <div className="mt-7">
          <button
            type="button"
            onClick={submitHandler}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-2"
          >
            {loading ? <HashLoader size={35} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
