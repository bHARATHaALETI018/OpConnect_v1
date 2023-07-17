import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useHistory } from "react-router-dom";
import API_BASE_URL from "../../config";

const StudentSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);

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
        .then((e) => {
          setPic(e.url.toString());
          console.log(e);
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
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !email ||
      !password ||
      !rollNumber ||
      !name ||
      !department ||
      !section ||
      !phone
    ) {
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
        `${API_BASE_URL}/api/student`,
        {
          email,
          password,
          rollNumber,
          name,
          department,
          section,
          phone,
          pic,
        },
        { headers: config.headers }
      );
      toast.success("Registration Successfull", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      localStorage.setItem("studentInfo", JSON.stringify(data));
      setLoading(false);

      history.push("/studentmain");
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    console.log("Student SignUP submitted");

    // Reset form fields
    setEmail("");
    setPassword("");
    setRollNumber("");
    setName("");
    setDepartment("");
    setSection("");
    setPhone("");
    setPic("");
  };
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <div className="flex w-full justify-center items-center">
      <form
        className=" w-full shadow-md rounded px-6 pt-4 pb-8 mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* ======================================================================================== */}
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row  gap-1">
          <div className="flex-row flex-1 p-3">
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

            <div className="mb-6 ">
              <label
                htmlFor="password"
                className="block text-white text-sm font-bold mb-2"
              >
                Password*
              </label>
              <div className="flex ">
                <input
                  type={!show ? "password" : "text"}
                  id="password"
                  className="shadow border rounded w-[80%] py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="flex-0 shadow border rounded w-[20%] p-1  text-white justify-center active:text-white "
                  onClick={(e) => handleClick(e)}
                >
                  {show ? "hide" : "show"}
                </button>
              </div>
            </div>

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
            <div className="mb-6">
              <label
                htmlFor="rollnumber"
                className="block text-white text-sm font-bold mb-2"
              >
                Roll Number*
              </label>
              <input
                type="text"
                id="rollnumber"
                className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your rollnumber"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>
          </div>
          {/* ======================================================================================== */}
          <div className="flex-col flex-1 p-3">
            <div className="mb-6">
              <label
                htmlFor="department"
                className="block text-white text-sm font-bold mb-2"
              >
                Department*
              </label>
              <input
                type="text"
                id="department"
                className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="section"
                className="block text-white text-sm font-bold mb-2"
              >
                Section*
              </label>
              <input
                type="text"
                id="section"
                className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-6">
              <label
                htmlFor="pic"
                className="block text-white text-sm font-bold mb-2"
              >
                Profile Photo
              </label>
              <input
                type="file"
                id="pic"
                className="shadow border rounded w-full py-2 px-3 text-black leading-tight "
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
          </div>
        </div>
        {/* ================================ */}
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
export default StudentSignup;
