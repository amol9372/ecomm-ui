import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  background,
  color,
} from "@chakra-ui/react";

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Extract form data and pass it to onSubmit
    const formData = new FormData(event.currentTarget);
    const addressData = {
      name: formData.get("name"),
      street: formData.get("street"),
      city: formData.get("city"),
      stateProvince: formData.get("stateProvince"),
      zipPostalCode: formData.get("zipPostalCode"),
      country: formData.get("country"),
    };
    onSubmit(addressData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Address</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" placeholder="Home, Office, etc." />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Street</FormLabel>
              <Input name="street" placeholder="1234 Main St" />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>City</FormLabel>
              <Input name="city" />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>State / Province</FormLabel>
              <Input name="stateProvince" />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>ZIP / Postal Code</FormLabel>
              <Input name="zipPostalCode" />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Country</FormLabel>
              <Select name="country" placeholder="Select country">
                <option value="CA">Canada</option>
                <option value="US">US</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter backgroundColor={"gray"}>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddressModal;
