import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "../components/Avatar";
import AdminStats from "../components/AdminStats";
import OpportunityCreate from "../components/OpportunityCollector";
import AdminOpportunityTable from "../components/AdminOpportunityTable";

import Spinner from "../components/Spinner";
import FeedbackCollector from "../components/FeedbackCollector";

const AdminMain = () => {
  const history = useHistory();
  const [admin, setAdmin] = useState(null);
  const [selected, setSelected] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("adminInfo"));
    setAdmin(admin);
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");
    history.push("/");
  };

  return (
    <div className="flex w-full overflow-x-hidden overflow-y-hidden">
      <div className="flex flex-col gap-3 w-[20%] p-6 border-r border-dashed border-r-2">
        <div className="flex gap-3 border-b border-dashed border-b-2 pb-3">
          <Avatar name={admin?.name} />
          <div>
            <p className="text-white text-lg font-bold capitalize ">{`${admin?.name}`}</p>
            <p className="text-white text-sm font-light">{`${admin?.email}`}</p>
          </div>
        </div>
        <div className="flex flex-col mt-4  gap-3">
          <button
            className={` p-3 rounded-xl capitalize bg-fourth
            ${
              selected === 1
                ? "text-[#3500D3] bg-slate-300 font-bold text-xl shadow shadow-2xl shadow-yellow-600 mt-3 mb-6"
                : ""
            }`}
            onClick={() => setSelected(1)}
          >
            home
          </button>
          <button
            className={` p-3 rounded-xl  capitalize  bg-fourth
            ${
              selected === 2
                ? "text-[#3500D3] bg-slate-300 font-bold text-xl shadow shadow-2xl shadow-yellow-600 my-6 "
                : ""
            }`}
            onClick={() => setSelected(2)}
          >
            add opportunity
          </button>
          <button
            className={` p-3 rounded-xl  capitalize  bg-fourth
            ${
              selected === 3
                ? "text-[#3500D3] bg-slate-300 font-bold text-xl shadow shadow-2xl shadow-yellow-600 my-6 "
                : ""
            }`}
            onClick={() => setSelected(3)}
          >
            view opportunities
          </button>
          <button
            className={` p-3 rounded-xl capitalize bg-fourth
            ${
              selected === 4
                ? "text-[#3500D3] bg-slate-300 font-bold text-xl shadow shadow-2xl shadow-yellow-600 mt-3 mb-6"
                : ""
            }`}
            onClick={() => setSelected(4)}
          >
            Feedback
          </button>
        </div>
        <div className="mt-4  gap-3">
          <button
            onClick={logoutHandler}
            className="px-9 py-3 rounded-xl capitalize  text-white bg-third hover:bg-[#ff0000] hover:shadow-2xl  hover:brightness-200 hover:shadow-white"
          >
            Logout
          </button>
        </div>
      </div>
      {/* ============================================= */}
      <div className="flex-1  p-6">
        {selected === 1 ? (
          <AdminStats />
        ) : selected === 2 ? (
          <OpportunityCreate />
        ) : selected === 3 ? (
          <AdminOpportunityTable />
        ) : (
          <FeedbackCollector user={admin._id} />
        )}
      </div>
    </div>
  );
};

export default AdminMain;
