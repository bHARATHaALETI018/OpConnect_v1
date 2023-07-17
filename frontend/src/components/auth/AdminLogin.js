import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
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
      const { data } = await axios.post(
        "/api/admin/login",
        {
          email,
          password,
        },
        config
      );
      toast.success("Login Successfull", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Display the toast for 3 seconds
      });

      localStorage.setItem("adminInfo", JSON.stringify(data));
      setLoading(false);

      history.push("/adminmain");
    } catch (error) {
      toast.error(`Invalid Email or Password`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Display the toast for 3 seconds
      });
      setLoading(false);
      return;
    }

    console.log("Login submitted");
    // console.log("Email:", email);
    // console.log("Password:", password);
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="flex w-full justify-center items-center ">
      <form
        className=" w-[80%] shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {/* ======================================================================================== */}
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
        {/* ======================================================================================== */}
        <div className="mb-6 flex flex-col">
          <label
            htmlFor="password"
            className="block text-white text-sm font-bold mb-2"
          >
            Password*
          </label>
          <div className="flex flex-row">
            <input
              type={show ? "text" : "password"}
              id="password"
              className="shadow border rounded w-[80%] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="flex-0 shadow border rounded w-[20%] py-1 px-2 text-white justify-center active:text-white "
              onClick={(e) => handleClick(e)}
            >
              {show ? "hide" : "show"}
            </button>
          </div>
        </div>

        {/* ================================ */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
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

export default AdminLogin;
