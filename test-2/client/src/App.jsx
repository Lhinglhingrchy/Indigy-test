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
import CreateButton from "./components/createButton.jsx";
import EditButton from "./components/editButton.jsx";
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
    return phoneNumber;
  };

  return (
    <div className="container">
      <div className="topic">
        <h1>รายชื่อพนักงาน</h1>
        <CreateButton set={setEmployeeData} />
      </div>

      <div className="table-container">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="md">รหัสพนักงาน</Th>
                <Th fontSize="md">ชื่อ-นามสกุล</Th>
                <Th fontSize="md">เบอร์โทร</Th>
                <Th fontSize="md">ตำแหน่ง</Th>
                <Th fontSize="md"></Th>
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
                      <div className="edit-delete-button">
                        <EditButton data={item.id} set={setEmployeeData} />
                        <DeleteButton data={item.id} set={setEmployeeData} />
                      </div>
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
