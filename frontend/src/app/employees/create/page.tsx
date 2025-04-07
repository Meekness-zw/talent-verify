'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import EmployeeForm from '@/components/employees/EmployeeForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CreateEmployeePage() {
  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await api.get('/companies/');
      return response.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/employees"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to employees
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
      
      {companies && <EmployeeForm companies={companies} />}
    </div>
  );
}