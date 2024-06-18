import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./App.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import DeleteButton from "./components/deleteButton.jsx";

function App() {
  const [employeeData, setEmployeeData] = useState([]);

  const getEmployeeData = async () => {
    const result = await axios.get("http://localhost:4000/employee");
    setEmployeeData(result.data.data);
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 10) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6)}`;
    }
    return phoneNumber; // Return as is if not 10 digits
  };

  return (
    <div className="container">
      <div className="topic">
        <h1>รายชื่อพนักงาน</h1>
        <div className="create-button">button</div>
      </div>

      <div className="table-container">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>รหัสพนักงาน</Th>
                <Th>ชื่อ-นามสกุล</Th>
                <Th>เบอร์โทร</Th>
                <Th>ตำแหน่ง</Th>
                <Th>ปุ่ม</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employeeData.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.employeeId}</Td>
                    <Td>
                      {item.name} {item.surname}
                    </Td>
                    <Td>{formatPhoneNumber(item.phone)}</Td>
                    <Td>{item.position}</Td>
                    <Td>
                      <DeleteButton data={item.id} set={setEmployeeData} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
