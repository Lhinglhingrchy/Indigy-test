import { useState, useEffect } from "react";
import axios from "axios";

function useHook() {
  const [employeeData, setEmployeeData] = useState([]);

  const getEmployeeData = async () => {
    const result = await axios.get("http://localhost:4000/employee");
    setEmployeeData(result.data.data);
  };

  const deleteEmployee = async (index) => {
    await axios.delete(`http://localhost:4000/employee/${index}`);
    const result = await axios.get("http://localhost:4000/employee");
    setEmployeeData(result.data.data);
  };

  useEffect(() => {
    getEmployeeData();
  }, []);
  return { employeeData };
}
export default useHook;
