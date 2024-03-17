import {Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { User } from "@models/user";
import { VerticalDotsIcon } from "./VerticalDotsIcon";

type Props = {
    users: User[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  banned: "danger"
};

const UserTable = ({users}: Props) => {
    const router = useRouter()

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
          <TableCell>
            <Dropdown className="dark text-foreground">
              <DropdownTrigger>
                <Button>
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="copy">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  );
}

export default UserTable;