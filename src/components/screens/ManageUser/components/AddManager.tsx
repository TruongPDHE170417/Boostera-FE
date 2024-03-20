import React, { useState } from "react";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { API_ENDPOINT } from "@models/api";

const roleList = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" }
];

export default function AddManager() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreate = async () => {
    const response = await fetch(`${API_ENDPOINT}/manager/add-manager`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, role })
    });

    if (response.ok) {
        alert('Manager created successfully!');
        onClose();
      setErrorMessage("");
    } else {
      setErrorMessage('Error creating manager. Please try again.');
    }
  };

  return (
    <>
      <Button color="danger" onPress={onOpen}>
        <p>Add Manager/Admin</p>
      </Button>
      <Modal className="dark text-foreground" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Manager</ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  type="email"
                  label="Email"
                  className="max-w-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Select
                    isRequired
                    label="Role"
                    value={role}
                    defaultSelectedKeys={[role]}
                    onChange={(e) => setRole(e.target.value)}
                    className="max-w-lg"
                >
                {roleList.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                        {role.label}
                        </SelectItem>
                ))}
                </Select>
                {errorMessage && <p color="danger">{errorMessage}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                <Button color="danger" onPress={handleCreate}>Create</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}