import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState();
  const history = useHistory();

  useEffect(() => {
    const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

    setStudent((prevStudent) => {
      if (!studentInfo) {
        history.push("/");
        return prevStudent;
      }
      return studentInfo;
    });
  }, [history]);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const StudentState = () => {
  return useContext(StudentContext);
};

export default StudentProvider;
