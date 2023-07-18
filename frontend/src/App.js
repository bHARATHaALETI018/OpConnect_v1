import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminMain from "./pages/AdminMain";
import StudentMain from "./pages/StudentMain";
import "./App.css";

const App = () => {
  return (
    <div className="min-h-screen bg-fifth text-white ">
      <div className="w-full text-center font-bold text-3xl p-6 bg-[#6A0DAD] top-0 sticky border-b border-b-2">
        AppMonitor{" "}
        <span className="rounded-full absolute capitalize top-0 text-black outline outline-indigo-500 opacity-75 right-0 p-3 m-2 text-sm flex flex-col  bg-slate-100">
          <spam className="font-semibold">Developer</spam>
          <a
            href={"https://bharathaaleti018.netlify.app/"}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse hover:scale-125 hover:text-bold hover:animate-none"
          >
            {`<Bharath Aaleti />`}
          </a>
        </span>
      </div>
      <Route path="/" component={HomePage} exact />
      <Route path="/studentmain" component={StudentMain} />
      <Route path="/adminmain" component={AdminMain} />
      <div className="bg-first sticky bottom-1 mx-3 w-60 p-1 rounded-md text-white text-md">
        <ul className="">
          <li>Note : </li>
          <li>
            1. This is not the final product It's a <span>BETA</span> version
          </li>
          <li>2. I will be adding more.</li>
          <li>3. Please logout after your work!</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
