'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import EmployeeDetails from '@/components/employees/EmployeeDetails';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const { data: employee, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const response = await api.get(`/employees/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!employee) {
    return <div>Employee not found</div>;
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
      
      <EmployeeDetails employee={employee} />
    </div>
  );
}