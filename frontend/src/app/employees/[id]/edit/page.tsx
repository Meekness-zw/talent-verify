'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import EmployeeForm from '@/components/employees/EmployeeForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EditEmployeePage() {
  const { id } = useParams();
  
  const { data: employee, isLoading: isEmployeeLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const response = await api.get(`/employees/${id}`);
      return response.data;
    },
  });

  const { data: companies, isLoading: isCompaniesLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await api.get('/companies/');
      return response.data;
    },
  });

  if (isEmployeeLoading || isCompaniesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/employees/${id}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to employee details
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900">Edit Employee</h1>
      
      {employee && companies && (
        <EmployeeForm 
          initialData={{
            ...employee,
            company: employee.company.id
          }} 
          companies={companies} 
        />
      )}
    </div>
  );
}