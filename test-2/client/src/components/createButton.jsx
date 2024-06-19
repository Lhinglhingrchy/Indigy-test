import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import "./button.css";

function CreateButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const [errorEmployeeId, setErrorEmployeeId] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPosition, setErrorPosition] = useState("");

  const createEmployee = async () => {
    await axios.post("http://localhost:4000/employee", {
      employeeId,
      name,
      surname,
      phone,
      position,
    });
    const result = await axios.get("http://localhost:4000/employee");
    props.set(result.data.data);
    onClose();
  };
  const handlesubmit = () => {
    if (employeeId === "") {
      setErrorEmployeeId("กรุณากรอกรหัสพนักงาน");
    } else if (employeeId.replace(/\D/g, "").length !== 6) {
      setErrorEmployeeId("กรุณากรอกรหัสพนักงานให้ครบ 6 หลัก");
    } else {
      setErrorEmployeeId("");
    }

    if (name === "") {
      setErrorName("กรุณากรอกชื่อ");
    } else {
      setErrorName("");
    }

    if (surname === "") {
      setErrorSurname("กรุณากรอกนามสกุล");
    } else {
      setErrorSurname("");
    }

    const validPhone = /^0\d{9}$/;
    if (phone === "") {
      setErrorPhone("กรุณากรอกเบอร์โทรศัพท์");
    } else if (!validPhone.test(phone)) {
      setErrorPhone("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
    } else {
      setErrorPhone("");
    }

    if (position === "") {
      setErrorPosition("กรุณาเลือกตำแหน่ง");
    } else {
      setErrorPosition("");
    }

    if (
      employeeId.length === 6 &&
      name !== "" &&
      surname !== "" &&
      validPhone.test(phone) &&
      position !== ""
    ) {
      createEmployee();
      setEmployeeId("");
      setName("");
      setSurname("");
      setPhone("");
      setPosition("");
    }
  };

  return (
    <div>
      <Button onClick={onOpen} colorScheme="green">
        เพิ่ม
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>เพิ่มรายชื่อพนักงาน</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <div className="employee-id">
                <label htmlFor="employee-id">
                  รหัสพนักงาน<span>*</span>
                </label>
                <br />
                <input
                  id="employee-id"
                  type="text"
                  placeholder="รหัสพนักงาน"
                  maxLength={6}
                  value={employeeId.replace(/\D/g, "")}
                  onChange={(event) => {
                    setEmployeeId(event.target.value);
                  }}
                  style={{
                    border: errorEmployeeId ? "2px solid red" : "1px solid ",
                  }}
                />
                {errorEmployeeId && (
                  <p style={{ color: "red" }}>{errorEmployeeId}</p>
                )}
              </div>

              <div className="first-name">
                <label htmlFor="first-name">
                  ชื่อ<span>*</span>
                </label>
                <br />
                <input
                  id="input-first-name"
                  type="text"
                  placeholder="ชื่อ"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  style={{
                    border: errorName ? "2px solid red" : "1px solid",
                  }}
                />
                {errorName && <p style={{ color: "red" }}>{errorName}</p>}
              </div>

              <div className="last-name">
                <label htmlFor="last-name">
                  นามสกุล<span>*</span>
                </label>
                <br />
                <input
                  id="input-last-name"
                  type="text"
                  placeholder="นามสกุล"
                  value={surname}
                  onChange={(event) => {
                    setSurname(event.target.value);
                  }}
                  style={{
                    border: errorSurname ? "2px solid red" : "1px solid",
                  }}
                />
                {errorSurname && <p style={{ color: "red" }}>{errorSurname}</p>}
              </div>

              <div className="phone-number">
                <label htmlFor="phone-number">
                  เบอร์โทร<span>*</span>
                </label>
                <br />
                <input
                  id="input-phone-number"
                  type="tel"
                  placeholder="เบอร์โทร"
                  maxLength={10}
                  value={phone.replace(/\D/g, "")}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  style={{
                    border: errorPhone ? "2px solid red" : "1px solid",
                  }}
                />
                {errorPhone && <p style={{ color: "red" }}>{errorPhone}</p>}
              </div>
              <div>
                <label htmlFor="position">
                  ตำแหน่ง<span>*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  value={position}
                  onChange={(event) => {
                    setPosition(event.target.value);
                  }}
                  style={{
                    border: errorPosition ? "2px solid red" : "1px solid",
                  }}
                >
                  <option>เลือกตำแหน่ง</option>
                  <option value="โปรแกรมเมอร์">โปรแกรมเมอร์</option>
                  <option value="ดีไซน์เนอร์">ดีไซน์เนอร์</option>
                  <option value="ผู้จัดการโครงการ">ผู้จัดการโครงการ</option>
                </select>
                {errorPosition && (
                  <p style={{ color: "red" }}>{errorPosition}</p>
                )}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                handlesubmit();
              }}
            >
              เพิ่ม
            </Button>
            <Button variant="ghost" onClick={onClose}>
              ปิด
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default CreateButton;
