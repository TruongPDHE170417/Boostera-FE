import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { User } from "@models/user";

interface UserSearchProps {
  users: User[];
  onSearch: (filteredUsers: User[]) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ users, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

    onSearch(filteredUsers);
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        className="dark text-foreground"
        type="text"
        label="Search"
        placeholder="Enter user name"
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default UserSearch;
