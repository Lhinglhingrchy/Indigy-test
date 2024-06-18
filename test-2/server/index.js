import express from "express";
import { employee } from "./data.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;
let employeeData = employee;
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/employee`, async (req, res) => {
  try {
    return res.json({
      data: employeeData,
    });
  } catch (error) {
    return res.json({
      message: "Data error",
    });
  }
});

app.post(`/employee`, async (req, res) => {
  try {
    employeeData.push({
      id: employeeData[employeeData.length - 1].id + 1,
      ...req.body,
    });
    return res.json({
      message: "New employee has been created successfully",
    });
  } catch (error) {
    return res.json({
      message: "Data error",
    });
  }
});

app.put(`/employee/:employeeId`, async (req, res) => {
  try {
    let employeeIdFromClient = Number(req.params.employeeId);
    const hasFound = employeeData.find((item) => {
      return item.id === employeeIdFromClient;
    });
    if (!hasFound) {
      return res.json({ message: "Cannot update, No data available!" });
    }
    const employeeIndex = employeeData.findIndex((item) => {
      return item.id === employeeIdFromClient;
    });
    employeeData[employeeIndex] = { id: employeeIdFromClient, ...req.body };
    return res.json({
      message: `Employee Id : ${employeeIdFromClient} has been updated successfully`,
    });
  } catch (error) {
    return res.json({
      message: "Data error",
    });
  }
});

app.delete(`/employee/:employeeId`, (req, res) => {
  const employeeIdFromClient = Number(req.params.employeeId);
  const hasFound = employeeData.find((item) => {
    return item.id === employeeIdFromClient;
  });
  if (!hasFound) {
    return res.json({ message: "Cannot delete, No data available!" });
  }
  const newData = employeeData.filter((item) => {
    return item.id !== employeeIdFromClient;
  });
  employeeData = newData;
  return res.json({
    message: `Employee Id : ${employeeIdFromClient} has been deleted successfully`,
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
