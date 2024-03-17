import React, { useState } from "react";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import { API_ENDPOINT } from "@models/api";

export default function AddManagerButton() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreate = async () => {
    const response = await fetch(`${API_ENDPOINT}/manager/add-manager`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name })
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
      <Button color="danger" onPress={onOpen}>Add Manager</Button>
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
                  className="max-w-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  type="text"
                  label="Name"
                  className="max-w-xs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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