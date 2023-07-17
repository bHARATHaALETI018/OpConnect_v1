import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [student, setStudent] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    const studentInfo = JSON.parse(localStorage.getItem("studentInfo"));

    if (studentInfo) {
      setStudent(studentInfo);
      history.push("/studentmain");
    } else if (adminInfo) {
      setAdmin(adminInfo);
      history.push("/adminmain");
    } else {
      history.push("/");
    }
  }, [history]);

  return (
    <UserContext.Provider value={{ admin, setAdmin, student, setStudent }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  const { admin, student } = useContext(UserContext);
  return { admin, student };
};

export default UserProvider;
