import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import API_BASE_URL from "../config";

const AdminStats = () => {
  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  // admin stats
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAcceptedSelected, setIsAcceptedSelected] = useState(false);
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [isTotalStudentsSelected, setIsTotalStudentsSelected] = useState(false);
  const [isTotalApplicationsSelected, setIsTotalApplicationsSelected] =
    useState(false);
  // filters
  const [rollNumberFilter, setRollNumberFilter] = useState("");
  const [studentNameFilter, setStudentNameFilter] = useState("");

  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
    fetchOpportunities();
    fetchStudents();
    fetchAcceptedStudent();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/student`);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/opportunities`);
      setOpportunities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/applications/all`);
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAcceptedStudent = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/applications/acceptedStudents`
      );
      setSelectedStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // admin stats.
  const companyNames = opportunities.map(
    (opportunity) => opportunity.companyName
  );
  const Companies = [...new Set(companyNames)];

  const accepted = applications.filter((application) => {
    return application.status === "Accepted";
  });

  const handleAcceptedClick = (e) => {
    e.preventDefault();
    setIsAcceptedSelected(!isAcceptedSelected);
    fetchAcceptedStudent();
  };
  const handleCompanyClick = (e) => {
    e.preventDefault();
    setIsCompanySelected(!isCompanySelected);
  };
  const handleTotalOpportunitiesClick = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.success(
      `Please click on  VIEW OPPORTUNITIES in the Navigation Bar to view all the opporunities`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      }
    );
    setLoading(false);
  };
  const handleFilteredApplications = (e) => {
    e.preventDefault();
    setLoading(true);

    const rollNumberRegex = new RegExp(rollNumberFilter, "i");
    const studentNameRegex = new RegExp(studentNameFilter, "i");

    const filteredApplications = applications.filter((application) => {
      const rollNumberMatch = rollNumberFilter
        ? rollNumberRegex.test(application.student.rollNumber)
        : true;
      const studentNameMatch = studentNameFilter
        ? studentNameRegex.test(application.student.name)
        : true;
      return rollNumberMatch && studentNameMatch;
    });

    setFilteredApplications(filteredApplications);

    setLoading(false);
  };
  const handleTotalStudentSelected = (e) => {
    e.preventDefault();
    setIsTotalStudentsSelected(!isTotalStudentsSelected);
  };
  const handleTotalApplicationSelected = (e) => {
    e.preventDefault();
    setIsTotalApplicationsSelected(!isTotalApplicationsSelected);
  };
  return (
    <div>
      <div className="bg- flex flex-col border-b border-dashed border-b-2 mb-12   ">
        <div className="uppercase text-2xl mx-auto font-bold">kpi's</div>
        {/* Total opportunities */}
        <div className="flex justify-around items-center">
          <div
            className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-90 hover:bg-indigo-500 cursor-pointer"
            onClick={(e) => handleTotalOpportunitiesClick(e)}
          >
            <p className="capitalize">total opportunities</p>
            <p className="text-4xl">{opportunities.length}</p>
          </div>

          {/* Total number of students */}
          <div
            className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-90 hover:bg-indigo-500 cursor-pointer"
            onClick={(e) => handleTotalStudentSelected(e)}
          >
            <p className="capitalize">
              Total No of students
              {isTotalStudentsSelected ? (
                <FaCheck className="ml-2 inline " />
              ) : (
                ""
              )}
            </p>
            <p className="text-4xl">{students.length}</p>
          </div>

          {/* Total applications */}
          <div
            className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-90 hover:bg-indigo-500 cursor-pointer"
            onClick={(e) => handleTotalApplicationSelected(e)}
          >
            <p className="capitalize">
              Total Applications
              {isTotalApplicationsSelected ? (
                <FaCheck className="ml-2 inline " />
              ) : (
                ""
              )}
            </p>
            <p className="text-4xl">{applications.length}</p>
          </div>
        </div>

        {/* Total companies */}
        <div className="flex justify-around items-center">
          <div
            className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-90 hover:bg-indigo-500 cursor-pointer"
            onClick={(e) => handleCompanyClick(e)}
          >
            <p className="capitalize">
              total companies
              {isCompanySelected ? <FaCheck className="ml-2 inline " /> : ""}
            </p>
            <p className="text-4xl">{Companies.length}</p>
          </div>

          {/* Total selected students */}
          <div
            className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-90 hover:bg-indigo-500 cursor-pointer"
            onClick={(e) => handleAcceptedClick(e)}
          >
            <p className="capitalize">
              Total selected students
              {isAcceptedSelected ? <FaCheck className="ml-2 inline " /> : ""}
            </p>
            <p className="text-4xl">{accepted.length}</p>
          </div>
        </div>
        <div className="capitalize mx-auto font-bold">
          feel free to click on <span className="uppercase">kpi's</span> for
          details
        </div>
      </div>

      {/* Selected students table */}
      <div className="flex gap-3  flex-wrap">
        <div className="w-full">
          {/* ------------------------------------- */}
          {isTotalApplicationsSelected && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl underline decoration-wavy">
                All Applications
              </h1>
              {/* filters starts. */}
              <div className="flex justify-center gap-3 font-semibold">
                <div className="flex flex-col gap-1 items-center justify-center my-4 ">
                  <label htmlFor="studentNameFilter" className="mr-2">
                    Student Name:
                  </label>
                  <input
                    type="text"
                    id="studentNameFilter"
                    placeholder="search for Student name"
                    value={studentNameFilter}
                    onChange={(e) => setStudentNameFilter(e.target.value)}
                    className="border border-second border-4 text-white px-4 py-2 rounded-xl"
                    style={{ width: "15rem", backgroundColor: "#282828" }}
                  />
                </div>
                <div className="flex flex-col gap-1 items-center justify-center my-4 ">
                  <label htmlFor="rollNumberFilter" className="mr-2">
                    Roll Number:
                  </label>
                  <input
                    type="text"
                    id="rollNumberFilter"
                    placeholder="search for roll number"
                    value={rollNumberFilter}
                    onChange={(e) => setRollNumberFilter(e.target.value)}
                    className="border border-second border-4 text-white px-4 py-2 rounded-xl"
                    style={{ width: "15rem", backgroundColor: "#282828" }}
                  />
                </div>
                <button
                  onClick={(e) => handleFilteredApplications(e)}
                  className="border bg-fourth border-second border-4 px-4 py-2 rounded-xl"
                  disabled={loading}
                >
                  Filter
                  {loading && (
                    <div className="flex justify-center mt-2">
                      <Oval color="#ffffff" height={20} width={20} />
                    </div>
                  )}
                </button>
              </div>
              {/* filters ends. */}
              {isTotalApplicationsSelected && (
                <table className="mt-4 text-center border-collapse w-full bg-first">
                  <thead className="bg-fourth">
                    <th className="border px-4 py-2">RollNumber</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">App. Number</th>
                    <th className="border px-4 py-2">Role</th>
                    <th className="border px-4 py-2">Company</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Link</th>
                    <th className="border px-4 py-2">Profile</th>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app._id}>
                        <td className="border px-4 py-2">
                          {app.student.rollNumber}
                        </td>
                        <td className="border px-4 py-2">{app.student.name}</td>
                        <td className="border px-4 py-2">
                          {app.student.department}
                        </td>
                        <td className="border px-4 py-2">
                          {app.student.email}
                        </td>
                        <td className="border px-4 py-2">
                          {app.student.phone}
                        </td>
                        <td className="border px-4 py-2">
                          {app.opportunity.appNumber}
                        </td>
                        <td className="border px-4 py-2">
                          {app.opportunity.title}
                        </td>
                        <td className="border px-4 py-2">
                          {app.opportunity.companyName}
                        </td>
                        <td className="border px-4 py-2">{app.status}</td>
                        <td className="border px-4 py-2">
                          <button className="rounded-xl bg-fifth p-2 border border-4 border-fourth hover:bg-fourth transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
                            <a
                              href={app.opportunity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Link
                            </a>
                          </button>
                        </td>
                        <td className="border px-4 py-2 w-[9rem]">
                          {app.student.pic ? (
                            <img
                              src={app.student.pic}
                              alt={``}
                              className="rounded-full"
                            />
                          ) : (
                            "No Profile Pic"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
        <div className="w-full">
          {/* ------------------------------------- */}
          {isCompanySelected && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl underline decoration-wavy">
                All Companies
              </h1>
              <table className="mt-4 text-center border-collapse w-full bg-first">
                <thead className="bg-fourth">
                  <th className="border px-4 py-2">S.NO</th>
                  <th className="border px-4 py-2">Company</th>
                </thead>
                <tbody>
                  {Companies.map((company, index) => (
                    <tr key={company}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="w-full">
          {/* ------------------------------------- */}
          {isAcceptedSelected && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl underline decoration-wavy">
                Selected Students
              </h1>
              <table className="mt-4 text-center border-collapse w-full bg-first">
                <thead className="bg-fourth">
                  <th className="border px-4 py-2">RollNumber</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Profile</th>
                  <th className="border px-4 py-2">App. Number</th>
                  <th className="border px-4 py-2">Company</th>
                  <th className="border px-4 py-2">Role</th>
                </thead>
                <tbody>
                  {selectedStudents.map((app) => (
                    <tr key={app._id}>
                      <td className="border px-4 py-2">
                        {app.student.rollNumber}
                      </td>
                      <td className="border px-4 py-2">{app.student.name}</td>
                      <td className="border px-4 py-2">
                        {app.student.department}
                      </td>
                      <td className="border px-4 py-2">{app.student.email}</td>
                      <td className="border px-4 py-2">{app.student.phone}</td>
                      <td className="border px-4 py-2 w-[9rem]">
                        {app.student.pic ? (
                          <img
                            src={app.student.pic}
                            alt=""
                            className="rounded-full"
                          />
                        ) : (
                          "No Profile Pic"
                        )}
                      </td>
                      <td className="border px-4 py-2">{app.appNumber}</td>
                      <td className="border px-4 py-2">{app.companyName}</td>
                      <td className="border px-4 py-2">{app.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="w-full">
          {/* ------------------------------------- */}
          {isTotalStudentsSelected && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl underline decoration-wavy">
                All Students
              </h1>
              <table className="mt-4 text-center border-collapse w-full bg-first">
                <thead className="bg-fourth">
                  <th className="border px-4 py-2">RollNumber</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Section</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Profile</th>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td className="border px-4 py-2">{student.rollNumber}</td>
                      <td className="border px-4 py-2">{student.name}</td>
                      <td className="border px-4 py-2">{student.department}</td>
                      <td className="border px-4 py-2">{student.section}</td>
                      <td className="border px-4 py-2">{student.email}</td>
                      <td className="border px-4 py-2">{student.phone}</td>
                      <td className="border px-4 py-2 w-[9rem]">
                        {student.pic ? (
                          <img
                            src={student.pic}
                            alt=""
                            className="rounded-full"
                          />
                        ) : (
                          "No Profile Pic"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
