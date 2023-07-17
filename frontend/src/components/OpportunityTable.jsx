import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const OpportunityTable = (props) => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [titleFilter, setTitleFilter] = useState("");
  const [appNumberFilter, setAppNumberFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/opportunities/filter", {
        params: {
          appNumber: appNumberFilter,
          title: titleFilter,
          companyName: companyFilter,
        },
      });
      setOpportunities(response.data);
      setLoading(false);
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

  useEffect(() => {
    fetchOpportunities();
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  });

  if (isLoading) {
    return <Spinner />;
  }

  const handleFilter = (e) => {
    e.preventDefault();
    fetchOpportunities();
    toast.success("Opportunities fetched successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };
  const handleApply = async (opportunityId) => {
    try {
      if (props.student && props.student.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${props.student.token}`,
          },
        };

        await axios.post(
          "/api/applications",
          { opportunityId },
          { headers: config.headers }
        );
        fetchOpportunities();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold text-center text-fourth underline  underline-offset-4 decoration-white/[0.33] decoration-2 decoration-wavy  mb-4">
        Opportunities
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
        <button
          onClick={handleFilter}
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
      <table className="mt-4 border-collapse w-full bg-first">
        <thead>
          <tr className="bg-fourth">
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Company</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Apply (URL)</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => (
            <tr key={opportunity._id}>
              <td className="border px-4 py-2">{opportunity.appNumber}</td>
              <td className="border px-4 py-2">{opportunity.title}</td>
              <td className="border px-4 py-2">{opportunity.companyName}</td>
              <td className="border px-4 py-2">{opportunity.description}</td>
              <td className="border px-4 py-2">
                <button
                  className="rounded-xl bg-fifth p-2 border border-4 border-fourth hover:bg-fourth

        transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                  onClick={() => handleApply(opportunity._id)}
                >
                  <a
                    href={opportunity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply
                  </a>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpportunityTable;
