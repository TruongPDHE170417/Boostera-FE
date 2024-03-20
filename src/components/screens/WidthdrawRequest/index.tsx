import React, { ChangeEvent, useEffect, useState } from 'react';
import { API_ENDPOINT, Response } from '@models/api';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,Input} from "@nextui-org/react";
import { formatId } from '@utils/formatId';
import Icon from '@components/icons';
import { NOTIFICATION_TYPE, notify } from '@utils/notify';
import { useRouter } from 'next/router';

interface BankAccount {
  accountNumber: string;
  accountName: string;
  location: string;
}

interface Job {
  _id: string;
  name: string;
}

const WithdrawRequestScreen: React.FC = () => {
  const route = useRouter();
  const [boosterId] = useState('65f9c565953b1e1fa671a4c7');
  const [jobId, setJobId] = useState('');
  const [bankAccount, setBankAccount] = useState<BankAccount>({
    accountNumber: '',
    accountName: '',
    location: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isRefetchJobs, setIsRefetchJobs] = useState<boolean>(false);

  useEffect(() => {
    const handleGetJobs = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/job/by-booster/${boosterId}`);
        const data = await response.json() as Job[];
        if (data?.length) {
          setJobs(data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }
    if (boosterId) {
      handleGetJobs();
    }
  }, [boosterId, isRefetchJobs]);

  const handleRequestWithdrawal = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/job/request-withdrawal/${jobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankAccount: bankAccount
        }),
      });
      const data = await response.json() as Response;
      if (data?.success) {
        setSuccessMessage('Withdrawal request successful!');
        setIsRefetchJobs(!isRefetchJobs); // Refetch jobs to update UI if needed
      } else {
        setErrorMessage('Failed to request withdrawal, please try again!');
      }
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
      setErrorMessage('Failed to request withdrawal, please try again!');
    }
  }

  const handleViewJobDetail = (jobId: string) => {
    route.push(`/job-detail/${jobId}`);
  }

  return (
    <div className="min-h-screen bg-theme text-white px-20 py-20">
      <p className="text-4xl font-semibold text-white text-center">Request Withdrawal</p>
      <div className="my-8">
        <p>Booster ID: {boosterId}</p>
        <div className="mt-4">
          <label htmlFor="jobId" className="text-lg text-white">Select Job:</label>
          <select
            id="jobId"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="block w-full bg-primary border-2 border-gray-400 py-2 px-4 rounded-md text-white mt-2"
          >
            <option value="">Select a Job</option>
            {jobs.map(job => (
             <option key={job._id} value={job._id}>{job._id}</option> 
            ))}
          </select>
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Account Number"
            value={bankAccount.accountNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBankAccount({ ...bankAccount, accountNumber: e.target.value })}
            className="flex w-full flex-wrap md:flex-nowrap gap-4"
          />
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Account Name"
            value={bankAccount.accountName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBankAccount({ ...bankAccount, accountName: e.target.value })}
            className="flex w-full flex-wrap md:flex-nowrap gap-4"
          />
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Location"
            value={bankAccount.location}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBankAccount({ ...bankAccount, location: e.target.value })}
           className="flex w-full flex-wrap md:flex-nowrap gap-4"
          />
        </div>
        <Button onClick={handleRequestWithdrawal} className="bg-primary text-white py-2 px-4 rounded-md mt-4">Request Withdrawal</Button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </div>
    </div>
  );
}


export default WithdrawRequestScreen;
