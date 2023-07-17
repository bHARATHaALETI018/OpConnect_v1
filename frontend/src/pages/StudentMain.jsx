import React, { useEffect, useState } from "react";
import StudentApplicationsTable from "../components/StudentApplicationsTable";
import { useHistory } from "react-router-dom";
import Avatar from "../components/Avatar";
import OpportunityTable from "../components/OpportunityTable";
import Spinner from "../components/Spinner";
import FeedbackCollector from "../components/FeedbackCollector";

const StudentMain = () => {
  const history = useHistory();
  const [student, setStudent] = useState(null);
  const [selected, setSelected] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("studentInfo"));
    setStudent(student);
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const logoutHandler = () => {
    localStorage.removeItem("studentInfo");
    history.push("/");
  };

  return (
    <div className="flex w-full overflow-x-hidden overflow-y-scroll">
      <div className="flex flex-col gap-3 w-[20%] p-6 border-r border-dashed border-r-2">
        {/* ---------- */}
        <div className="flex gap-3 border-b border-dashed border-b-2 pb-3">
          <Avatar name={student?.name} pic={student?.pic} />
          <div>
            <p className="text-white text-lg font-bold capitalize   ">{`${student?.name}`}</p>
            <p className="text-white text-sm font-light">{`${student?.email}`}</p>
          </div>
        </div>
        {/* ------------------ */}
        <div className="flex flex-col mt-4  gap-3">
          <button
            className={` p-3 rounded-xl  bg-fourth
            ${
              selected === 1
                ? "text-[#3500D3] bg-slate-300 font-bold text-xl shadow shadow-2xl shadow-yellow-600 mt-3 mb-6 "
                : ""
            }`}
            onClick={() => setSelected(1)}
          >
            Applications
          </button>
          <button
            className={` p-3 rounded-xl  bg-fourth
            ${
              selected === 2
                ? "text-[#3500D3] bg-slate-300 font-bold text-xl shadow shadow-2xl shadow-yellow-600 my-6 "
                : ""
            }`}
            onClick={() => setSelected(2)}
          >
            Opportunities
          </button>
          <button
            className={` p-3 rounded-xl  bg-fourth
            ${
              selected === 3
                ? "text-[#3500D3] bg-slate-300 font-bold text-xl shadow shadow-2xl shadow-yellow-600 my-6 "
                : ""
            }`}
            onClick={() => setSelected(3)}
          >
            Feedback
          </button>
        </div>
        {/* ------------- */}
        <div className="mt-4  gap-3">
          <button
            onClick={logoutHandler}
            className="px-9 py-3 rounded-xl text-white bg-third hover:bg-[#ff0000] hover:shadow-2xl  hover:brightness-200 hover:shadow-white"
          >
            Logout
          </button>
        </div>
        {/* ------------ */}
      </div>
      {/* ================ */}
      <div className="flex-1 p-6">
        {selected === 1 ? (
          <StudentApplicationsTable student={student} />
        ) : selected === 2 ? (
          <OpportunityTable student={student} />
        ) : (
          <FeedbackCollector user={student._id} />
        )}
      </div>
    </div>
  );
};

export default StudentMain;
