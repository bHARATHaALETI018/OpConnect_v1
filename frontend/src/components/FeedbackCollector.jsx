import axios from "axios";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const FeedbackCollector = (props) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!description) {
      toast.error("Please add your valuable feedback", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/feedback", {
        userId: props.user,
        description: description,
      });
      toast.success(
        "Thank you for your valuable feedback. We will work on it",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        }
      );
      setLoading(false);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }
    console.log("feedback Added!..");

    setDescription("");
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <h1 className="text-2xl font-bold text-center capitalize underline decoration-wavy decoration-2 underline-offset-4 tracking-widest">
        feedback
      </h1>
      <ul className="list-disc">
        <li>Tell me about your experience</li>
        <li>Any more features to add</li>
        <li>Any changes to make</li>
      </ul>
      <form
        className="w-[70%] flex  flex-col justify-center items-center "
        onSubmit={handleSubmit}
      >
        <div className="mb-4 w-full">
          <label htmlFor="description" className="block mb-2 font-medium">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            rows="7"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-second border-4 w-full text-white  px-4 py-2 rounded-xl outline outline-slate-500"
            style={{ backgroundColor: "#282828" }}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-fourth w-[70%] text-white px-4 py-5 rounded-md hover:bg-indigo-300"
        >
          {loading && (
            <div className="flex justify-center  text-2xl mt-2 ">
              <Oval color="#4F46E5" height={20} width={20} />
            </div>
          )}
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackCollector;
