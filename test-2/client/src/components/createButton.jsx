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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import "./button.css";

function CreateButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

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
  const handlesubmit = (event) => {
    createEmployee();
    setEmployeeId("");
    setName("");
    setSurname("");
    setPhone("");
    setPosition("");
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        เพิ่ม
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
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
                  value={employeeId}
                  onChange={(event) => {
                    setEmployeeId(event.target.value);
                  }}
                  // style={{
                  //   border: errorFirstName ? "2px solid red" : "1px solid black",
                  // }}
                />
                {/* {errorFirstName && <p style={{ color: "red" }}>{errorFirstName}</p>} */}
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
                  // style={{
                  //   border: errorFirstName ? "2px solid red" : "1px solid black",
                  // }}
                />
                {/* {errorFirstName && <p style={{ color: "red" }}>{errorFirstName}</p>} */}
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
                  // style={{
                  //   border: errorLastName ? "2px solid red" : "1px solid black",
                  // }}
                />
                {/* {errorLastName && <p style={{ color: "red" }}>{errorLastName}</p>} */}
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
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value.replace(/\D/g, ""));
                  }}
                  // style={{
                  //   border: errorPhoneNumber ? "2px solid red" : "1px solid black",
                  // }}
                />
                {/* {errorPhoneNumber && (
            <p style={{ color: "red" }}>{errorPhoneNumber}</p>
          )} */}
              </div>
              <label htmlFor="position">
                ตำแหน่ง<span>*</span>
              </label>
              <select
                id="position"
                name="position"
                // set ช่อง category ให้สามารถเลือก category ได้
                value={position}
                onChange={(event) => {
                  setPosition(event.target.value);
                }}
              >
                <option>เลือกตำแหน่ง</option>
                <option value="โปรแกรมเมอร์">โปรแกรมเมอร์</option>
                <option value="ดีไซน์เนอร์">ดีไซน์เนอร์</option>
                <option value="ผู้จัดการโครงการ">ผู้จัดการโครงการ</option>
              </select>
            </form>
          </ModalBody>
          {/* onClick={handlesubmit} */}
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
    </>
  );
}
export default CreateButton;
