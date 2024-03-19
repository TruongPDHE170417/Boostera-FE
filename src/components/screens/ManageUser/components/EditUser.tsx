import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "@models/api";
import { User } from "@models/user";

const statusList = [
    { label: "Pending", value: "pending" },
    { label: "Active", value: "active" },
    { label: "Banned", value: "banned" },
  ];

const roleList = [
    { label: "Booster", value: "booster" },
    { label: "Customer", value: "customer" },
    { label: "Manager", value: "manager" }
  ];

type EditUserProps = {
    user: User;
    handleGetBoosterList: () => void;
};

export default function EditUser({ user, handleGetBoosterList }: EditUserProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setStatus(user.status);
    setRole(user.role);
  }, [user]);

  const handleUpdate = async () => {
    const response = await fetch(`${API_ENDPOINT}/user/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, status, role })
    });

    if (response.ok) {
      alert('User Info updated successfully!');
      onClose();
      setErrorMessage("");
      handleGetBoosterList();
    } else {
      setErrorMessage('Error updating user. Please try again.');
    }
  };

  return (
    <>
      <Button isIconOnly color="warning" onPress={onOpen}>
        <Pencil />
      </Button>
      <Modal className="dark text-foreground" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  type="email"
                  label="Email"
                  className="max-w-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  type="text"
                  label="Name"
                  className="max-w-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Select
                  isRequired
                  label="Status"
                  value={status}
                  defaultSelectedKeys={[user.status]}
                  onChange={(e) => setStatus(e.target.value)}
                  className="max-w-lg"
                >
                {statusList.map((status) => (
                    <SelectItem key={status.value} value={status.value} >
                    {status.label}
                    </SelectItem>
                ))}
                </Select>
                <Select
                    isRequired
                    label="Role"
                    value={role}
                    defaultSelectedKeys={[user.role]}
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
                <Button color="danger" onPress={handleUpdate}>Update</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
