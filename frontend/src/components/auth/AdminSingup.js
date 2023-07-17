import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useHistory } from "react-router-dom";
import API_BASE_URL from "../../config";

const AdminSingup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const postPic = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.error("Please select an image.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        // Display the toast for 3 seconds
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpg" || pics.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "AppMonitor");
      data.append("cloud_name", "bharath018");
      fetch("https://api.cloudinary.com/v1_1/bharath018/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    } else {
      toast.error("Please select an image.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        // Display the toast for 3 seconds
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //signUp logic
    setLoading(true);
    if (!email || !password || !name || !phone) {
      toast.error("Please fill all the required fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Display the toast for 3 seconds
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      ///////////////////////////////////
      // const print = {
      //   email: email,
      //   password: password,
      //   name: name,
      //   phone: phone,
      // };
      // console.log(print);
      //////////////////////////////
      const { data } = await axios.post(
        `${API_BASE_URL}/api/admin`,
        {
          email,
          password,
          name,
          phone,
          pic,
        },
        config
      );
      toast.success("Registration Successfull", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Display the toast for 3 seconds
      });

      localStorage.setItem("adminInfo", JSON.stringify(data));
      setLoading(false);

      history.push("/adminmain");
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Display the toast for 3 seconds
      });
      setLoading(false);
      return;
    }

    console.log("Admin SignUP submitted");

    // Reset form fields
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setPic("");
  };

  return (
    <div className="flex w-full justify-center items-center">
      <form
        className=" w-full shadow-md rounded px-6 pt-4 pb-8 mb-4
        "
        onSubmit={handleSubmit}
      >
        {/* ======================================================================================== */}
        <div className="flex flex-col p-3">
          {/* <div className="flex-row flex- p-3"> */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-bold mb-2"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* ========================= */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-sm font-bold mb-2"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* ========================= */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-white text-sm font-bold mb-2"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* ========================= */}
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-white text-sm font-bold mb-2"
            >
              Phone*
            </label>
            <input
              type="number"
              id="phone"
              className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {/* ========================= */}
          <div className="mb-6">
            <label
              htmlFor="pic"
              className="block text-white text-sm font-bold mb-2"
            >
              Profile Photo*
            </label>
            <input
              type="file"
              id="pic"
              className="shadow border rounded w-full py-2 px-3 text-black leading-tight cursor-pointer"
              placeholder="Upload your Picture"
              accept="image/*"
              onChange={(e) => postPic(e.target.files[0])}
              disabled={loading}
            />
            {loading && (
              <div className="flex justify-center mt-2">
                <Oval color="#4F46E5" height={20} width={20} />
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
        {/* ================================================================================= */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            SignUp
          </button>
          {loading && (
            <div className="flex justify-center mt-2">
              <Oval color="#4F46E5" height={20} width={20} />
            </div>
          )}
          <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            {" "}
            (*) -{">"} required
          </p>
          {/* 
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >  Forgot Password?  </a>
          */}
        </div>
      </form>
    </div>
  );
};

export default AdminSingup;
