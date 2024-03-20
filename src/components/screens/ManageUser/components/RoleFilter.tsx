import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';

const roles = [
  { label: "All", value: "" },
  { label: "Booster", value: "booster" },
  { label: "Customer", value: "customer" },
  { label: "Manager", value: "manager" }
];

interface RoleFilterProps {
  onRoleChange: (role: string | null) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({ onRoleChange }) => {
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value;
    onRoleChange(role === "" ? null : role); // Convert empty string to null
  };

  return (
    <Select
      items={roles}
      placeholder="Role"
      className="max-w-xs dark text-foreground"
      onChange={handleRoleChange}
    >
      {(role) => <SelectItem key={role.value}>{role.label}</SelectItem>}
    </Select>
  );
};

export default RoleFilter;
