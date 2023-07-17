import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StudentLogin from "../components/auth/StudentLogin";
import AdminLogin from "../components/auth/AdminLogin";
import StudentSignup from "../components/auth/StudentSignup";

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("studentInfo"));
    const admin = JSON.parse(localStorage.getItem("adminInfo"));
    if (student) {
      console.log(student);
      history.push("/studentmain");
    } else if (admin) {
      console.log(admin);
      history.push("/adminmain");
    }
  }, [history]);

  const [activeMainTab, setActiveMainTab] = useState(1);
  const [activeSubTab, setActiveSubTab] = useState(1);

  const handleMainTabClick = (tabNumber) => {
    setActiveMainTab(tabNumber);
    setActiveSubTab(1);
  };

  const handleSubTabClick = (tabNumber) => {
    setActiveSubTab(tabNumber);
  };

  return (
    <div className="w-full bg-fifth flex items-center justify-center text-white  ">
      <div
        className=" relative rounded-3xl shadow-md shadow-white   
      w-[60%] max-w-lg flex flex-col items-center align-center justify-center "
      >
        {/* <h1
          className="text-white text-4xl font-bold antialiased w-full text-center top-0 rounded-2xl 
        shadow-inner shadow-second  p-3 border-b 
        bg-fourth
        "
        >
          AppMonitor
        </h1> */}

        <div className="rounded-xl w-full h- p-3 border-b  m-4 bg-third ">
          <ul className="flex ">
            <li
              className={`flex-1 p-2 text-center rounded-xl
                ${
                  activeMainTab === 1 ? "bg-fifth text-white border-b-2 " : ""
                }  
              `}
            >
              <button
                className="text-lg  font-medium focus:outline-none"
                onClick={() => handleMainTabClick(1)}
              >
                Student
              </button>
            </li>
            {/* ========================================= */}
            <li
              className={`flex-1 p-2 text-center rounded-xl
              ${activeMainTab === 2 ? "bg-fifth text-white border-b-2" : ""}`}
            >
              <button
                className="text-lg font-medium focus:outline-none"
                onClick={() => handleMainTabClick(2)}
              >
                Admin
              </button>
            </li>
          </ul>
        </div>
        {/* ==================================== */}
        {activeMainTab === 1 && (
          <div className="rounded-xl w-full ">
            <div className="rounded-xl w-full p-3 border-b  mb-4 bg-third">
              <ul className="flex">
                <li
                  className={`flex-1 p-2 text-center rounded-xl ${
                    activeSubTab === 1 ? "bg-fifth text-white border-b-2" : ""
                  }`}
                >
                  <button
                    className="text-lg font-medium focus:outline-none"
                    onClick={() => handleSubTabClick(1)}
                  >
                    Login
                  </button>
                </li>

                <li
                  className={`flex-1 p-2 text-center rounded-xl ${
                    activeSubTab === 2 ? "bg-fifth text-black border-b-2" : ""
                  }`}
                >
                  <button
                    className="text-lg font-medium focus:outline-none"
                    onClick={() => handleSubTabClick(2)}
                  >
                    SignUp
                  </button>
                </li>
              </ul>
            </div>

            {activeSubTab === 1 && <StudentLogin />}

            {activeSubTab === 2 && <StudentSignup />}
          </div>
        )}
        {/* ====================================================================================*/}
        {activeMainTab === 2 && (
          <div className="rounded-xl w-full ">
            <div className="rounded-xl w-full p-3 border-b  mb-4 bg-third">
              <ul className="flex">
                <li
                  className={`flex-1 p-2 text-center rounded-xl ${
                    activeSubTab === 1 ? "bg-fifth text-white border-b-2" : ""
                  }`}
                >
                  <button
                    className="text-lg font-medium focus:outline-none"
                    onClick={() => handleSubTabClick(1)}
                  >
                    Login
                  </button>
                </li>
                {/* <li
                  className={`flex-1 p-2 text-center rounded-xl ${
                    activeSubTab === 2
                      ? "bg-yellow-300 text-black border-b-2"
                      : ""
                  }`}
                >
                  <button
                    className="text-lg font-medium focus:outline-none"
                    onClick={() => handleSubTabClick(2)}
                  >
                    SignUp
                  </button>
                </li> */}
              </ul>
            </div>

            {activeSubTab === 1 && <AdminLogin />}

            {/* {activeSubTab === 2 && <AdminSignup />} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
