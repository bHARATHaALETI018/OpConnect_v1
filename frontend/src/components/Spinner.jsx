import React from "react";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <FaSpinner className="animate-spin text-4xl text-primary" />
    </div>
  );
};

export default Spinner;
