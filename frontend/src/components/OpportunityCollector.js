import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useHistory } from "react-router-dom";

const OpportunityCreate = () => {
  const [appNumber, setAppNumber] = useState("");
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!appNumber || !companyName || !title || !description || !url) {
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
      await axios.post(
        "/api/opportunities",
        {
          appNumber,
          title,
          description,
          companyName,
          url,
        },
        config
      );
      toast.success("Opportunity added successfully!..", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
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

    console.log("Opportunity Added!..");

    setAppNumber("");
    setTitle("");
    setDescription("");
    setCompanyName("");
    setUrl("");
  };

  return (
    <div className=" mx-auto p-4 bg-first rounded-2xl mx-20 ">
      <h1 className="text-2xl font-bold mb-4">Application</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="appNumber" className="block mb-2 font-medium">
            Application Number:
          </label>
          <input
            type="Number"
            id="appNumber"
            value={appNumber}
            onChange={(e) => setAppNumber(e.target.value)}
            // className="border border-second border-4 w-full text-white  px-4 py-2 rounded-xl"
            className="border border-second border-4 w-full text-white  px-4 py-2 rounded-xl"
            style={{ backgroundColor: "#282828" }}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-second border-4 w-full text-white  px-4 py-2 rounded-xl"
            style={{ backgroundColor: "#282828" }}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-medium">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            rows="7"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-second border-4 w-full text-white  px-4 py-2 rounded-xl"
            style={{ backgroundColor: "#282828" }}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="block mb-2 font-medium">
            Company Name:
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border border-second border-4 w-full text-white  px-4 py-2 rounded-xl"
            style={{ backgroundColor: "#282828" }}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="url" className="block mb-2 font-medium">
            url:
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-second border-4 w-full text-white  px-4 py-2 rounded-xl"
            style={{ backgroundColor: "#282828" }}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-fourth text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Submit
          {loading && (
            <div className="flex justify-center mt-2 ">
              <Oval color="#4F46E5" height={20} width={20} />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default OpportunityCreate;
