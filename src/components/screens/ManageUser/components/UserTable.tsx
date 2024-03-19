import {Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import { Ban, RefreshCcw } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { API_ENDPOINT } from "@models/api";
import { User } from "@models/user";
import EditUser from "./EditUser";
import { VerticalDotsIcon } from "./VerticalDotsIcon";

type Props = {
    users: User[];
    handleGetBoosterList: () => void;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  banned: "danger"
};

const UserTable = ({users, handleGetBoosterList}: Props) => {
    const router = useRouter()

    const handleBanUser = async (id: string, currentStatus: string) => {
      // Determine the new status
      const newStatus = currentStatus === 'banned' ? 'active' : 'banned';
  
      // Call the API to change the status of the user
      await fetch(`${API_ENDPOINT}/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
  
      // Refresh the user list
      handleGetBoosterList();
    };

    const toUserDetail = (id: string) => {
        void router.push(`/user/${id}`)
    }

  return (
    <Table className="dark text-foreground" isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody>
      {users.map((user, index) => (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell className="capitalize">{user.role}</TableCell>
          <TableCell>
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {user.status}
          </Chip>
          </TableCell>
          <TableCell className="flex gap-3">
            <EditUser user={user} handleGetBoosterList={handleGetBoosterList} />
            <Button isIconOnly onClick={() => handleBanUser(user._id, user.status)}>
              <RefreshCcw />
            </Button>
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  );
}

export default UserTable;