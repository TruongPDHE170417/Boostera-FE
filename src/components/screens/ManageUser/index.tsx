import { Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { API_ENDPOINT } from '@models/api';
import { User } from '@models/user';
import AddManager from './components/AddManager';
import RoleFilter from './components/RoleFilter';
import Pagination from './components/UserPagination';
import UserSearch from './components/UserSearch';
import UserTable from './components/UserTable';

const ITEMS_PER_PAGE = 9;

const ManageUserScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);


  useEffect(() => {
    handleGetBoosterList();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  // Filter users based on the selected role
  const filteredUsersByRole = selectedRole
    ? users.filter(user => user.role === selectedRole)
    : users;

  // Combine search and role filter
  const filteredUsers = searchedUsers.length > 0
    ? searchedUsers.filter(user => filteredUsersByRole.includes(user))
    : filteredUsersByRole;

  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleGetBoosterList = async () => {
    const response = await fetch(`${API_ENDPOINT}/user/`);
    const data = await response.json() as User[];
    setUsers(data);
    setLoading(false);
  };

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const total = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handleRoleChange = (role: string | null) => {
    setSelectedRole(role);
    setCurrentPage(1); // Reset pagination when role changes
  };

  const handleSearch = (filteredUsers: User[]) => {
    setSearchedUsers(filteredUsers);
    setCurrentPage(1); // Reset pagination when search changes
  };

  if (isLoading) {
    return <Spinner color="primary" size="lg" className="w-[100%] h-[100%]" />;
  }

  return (
    <div className="py-24 md:px-12 lg:px-16 xl:px-80 w-screen bg-theme">
      <div className="container mx-auto px-[15%]">
        <div className='flex gap-3'>
          <UserSearch users={users} onSearch={handleSearch} />
          <RoleFilter onRoleChange={handleRoleChange} />
          <AddManager />
        </div>
        <UserTable users={currentItems} handleGetBoosterList={handleGetBoosterList} />
        <Pagination total={total} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ManageUserScreen;
