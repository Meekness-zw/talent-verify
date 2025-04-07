'use client';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Company } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  employee_id?: string;
  company: string;
}

interface EmployeeFormProps {
  initialData?: EmployeeFormData & { id?: string };
  companies: Company[];
}

export default function EmployeeForm({ initialData, companies }: EmployeeFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditing = !!initialData?.id;

  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>({
    defaultValues: initialData || {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      employee_id: '',
      company: companies.length > 0 ? companies[0].id : '',
    },
  });

  const { mutate: createEmployee, isLoading: isCreating } = useMutation({
    mutationFn: async (data: EmployeeFormData) => {
      const response = await api.post('/employees/', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Employee created successfully');
      queryClient.invalidateQueries(['employees']);
      router.push('/employees');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create employee');
    },
  });

  const { mutate: updateEmployee, isLoading: isUpdating } = useMutation({
    mutationFn: async (data: EmployeeFormData) => {
      const response = await api.patch(`/employees/${initialData?.id}/`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Employee updated successfully');
      queryClient.invalidateQueries(['employees']);
      queryClient.invalidateQueries(['employee', initialData?.id]);
      router.push(`/employees/${initialData?.id}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update employee');
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    if (isEditing) {
      updateEmployee(data);
    } else {
      createEmployee(data);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Basic details about the employee
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  {...register('first_name', { required: 'First name is required' })}
                  className={`mt-1 block w-full border ${errors.first_name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  {...register('last_name', { required: 'Last name is required' })}
                  className={`mt-1 block w-full border ${errors.last_name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employee_id"
                  {...register('employee_id')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <select
                  id="company"
                  {...register('company', { required: 'Company is required' })}
                  className={`mt-1 block w-full border ${errors.company ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => router.push(isEditing ? `/employees/${initialData.id}` : '/employees')}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <LoadingSpinner className="h-5 w-5 text-white" />
          ) : isEditing ? (
            'Update Employee'
          ) : (
            'Create Employee'
          )}
        </button>
      </div>
    </form>
  );
}