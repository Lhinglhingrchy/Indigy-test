import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";

function DeleteButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const deleteEmployee = async () => {
    await axios.delete(`http://localhost:4000/employee/${props.data}`);
    const result = await axios.get("http://localhost:4000/employee");
    props.set(result.data.data);
    onClose();
  };

  return (
    <div>
      <Button colorScheme="red" onClick={onOpen}>
        ลบ
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>ลบรายชื่อพนักงาน</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>ต้องการลบรายชื่อพนักงานใช่หรือไม่</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteEmployee();
              }}
            >
              ใช่
            </Button>
            <Button ref={cancelRef} ml={3} onClick={onClose}>
              ไม่
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteButton;
