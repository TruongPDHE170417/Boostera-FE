import { Input } from "@nextui-org/react";
import React, { useState } from "react";
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
      user.email.toLowerCase().includes(query.toLowerCase())
    );

    onSearch(filteredUsers);
  };

  return (
      <Input
        className="dark text-foreground max-w-lg"
        type="text"
        label="Search"
        placeholder="Enter user name"
        value={searchQuery}
        onChange={handleSearch}
      />
  );
};

export default UserSearch;
