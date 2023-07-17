import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import API_BASE_URL from "../config";

const StudentApplicationsTable = (props) => {
  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [appNumberFilter, setAppNumberFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
    fetchOpportunities();
  });

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/opportunities`);
      setOpportunities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      if (props.student && props.student.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${props.student?.token}`,
          },
        };

        const response = await axios.get(
          `${API_BASE_URL}/api/applications/filter`,
          {
            params: {
              appNumber: appNumberFilter,
              title: titleFilter,
              companyName: companyFilter,
              status: statusFilter,
            },
            headers: config.headers,
          }
        );

        setApplications(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchApplications();
    toast.success("Applications fetched successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    setLoading(true);
    try {
      console.log(`id: ${applicationId} and status: ${newStatus}`);
      if (props.student && props.student.token) {
        await axios.put(`${API_BASE_URL}/api/applications/${applicationId}`, {
          status: newStatus,
        });

        fetchApplications();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const companyNames = opportunities.map(
    (opportunity) => opportunity.companyName
  );
  const Companies = new Set(companyNames);
  const accepted = applications.filter((application) => {
    return application.status === "Accepted";
  });
  const rejected = applications.filter((application) => {
    return application.status === "Rejected";
  });
  return (
    <div>
      <div className="flex justify-around items-center w-full border-b border-dashed border-b-2 mb-3">
        <div
          className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-110 hover:bg-indigo-500 "
        >
          <p className="capitalize">total opportunities</p>
          <p className="text-4xl">{opportunities.length}</p>
        </div>
        <div
          className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-110 hover:bg-indigo-500 "
        >
          <p className="capitalize">Your Applications</p>
          <p className="text-4xl">{applications.length}</p>
        </div>
        <div
          className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-110 hover:bg-indigo-500 "
        >
          <p className="capitalize">app. in Diff. companies</p>
          <p className="text-4xl">{Companies.size}</p>
        </div>
        <div
          className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-110 hover:bg-indigo-500 "
        >
          <p className="capitalize">Total selected</p>
          <p className="text-4xl">{accepted.length}</p>
        </div>
        <div
          className="flex-auto m-12 rounded-2xl bg-third m-3 p-9 flex flex-col font-bold text-xl items-center
        transition ease-in-out bg-blue-500 hover:translate-y-1 hover:scale-110 hover:bg-indigo-500 "
        >
          <p className="capitalize">Total rejected</p>
          <p className="text-4xl">{rejected.length}</p>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center text-fourth underline underline-offset-4 decoration-white/[0.33] decoration-2 decoration-wavy  mb-4">
          Applications
        </h1>
        <div className="flex justify-center gap-3 font-semibold">
          <div className="flex flex-col gap-1 items-center justify-center my-4 ">
            <label htmlFor="appNumberFilter" className="mr-2">
              Application Number:
            </label>
            <input
              type="text"
              id="appNumberFilter"
              placeholder="search by id"
              value={appNumberFilter}
              onChange={(e) => setAppNumberFilter(e.target.value)}
              className="border border-second border-4 text-white px-4 py-2 rounded-xl"
              style={{ width: "12rem", backgroundColor: "#282828" }}
            />
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-4">
            <label htmlFor="titleFilter" className="mr-2">
              Title:
            </label>
            <input
              type="text"
              id="titleFilter"
              placeholder="search by Title"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              className="border border-second border-4 text-white  px-4 py-2 rounded-xl"
              style={{ backgroundColor: "#282828" }}
            />
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-4">
            <label htmlFor="companyFilter" className="mr-2">
              Company:
            </label>
            <input
              type="text"
              id="companyFilter"
              placeholder="search by company"
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="border border-second border-4 text-white  px-4 py-2 rounded-xl"
              style={{ backgroundColor: "#282828" }}
            />
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-4">
            <label htmlFor="statusFilter" className="mr-2">
              Status:
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-second border-4 text-white px-4 py-2 rounded-xl"
              style={{ backgroundColor: "#190061" }}
            >
              <option value="">All</option>
              <option value="Applied">Applied</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button
            onClick={handleFilter}
            className="border bg-fourth border-second border-4 px-4 py-2 rounded-xl"
            disabled={loading}
          >
            Apply
            {loading && (
              <div className="flex justify-center mt-2">
                <Oval color="#ffffff" height={20} width={20} />
              </div>
            )}
          </button>
        </div>
        <table className="mt-4 border-collapse w-full bg-first">
          <thead>
            <tr className="bg-fourth">
              <th className="border px-4 py-2">Opportunity ID</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="border px-4 py-2">{application.appNumber}</td>
                <td className="border px-4 py-2">{application.title}</td>
                <td className="border px-4 py-2">{application.companyName}</td>
                <td className="border px-4 py-2">{application.description}</td>
                <td className="border px-4 py-2">
                  <select
                    value={application.status}
                    onChange={(e) =>
                      handleStatusChange(application._id, e.target.value)
                    }
                    className="px-4 py-2 rounded-xl bg-fifth p-2 border border-4 border-fourth hover:bg-fourth"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentApplicationsTable;
