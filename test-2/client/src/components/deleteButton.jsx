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

  const deleteEmployee = async (index) => {
    await axios.delete(`http://localhost:4000/employee/${index}`);
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
            <Button ref={cancelRef} onClick={onClose}>
              ไม่
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                deleteEmployee(props.data);
              }}
            >
              ใช่
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteButton;
