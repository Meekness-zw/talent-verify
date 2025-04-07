import { format } from 'date-fns';
import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  employee_id?: string;
  company: {
    name: string;
  };
  employment_history: Array<{
    id: string;
    department: {
      name: string;
    };
    role: {
      name: string;
    };
    start_date: string;
    end_date?: string;
    is_current: boolean;
    duties?: string;
  }>;
  created_at: string;
  updated_at: string;
}

interface EmployeeDetailsProps {
  employee: Employee;
}

export default function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Employee Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and employment records
          </p>
        </div>
        <Link
          href={`/employees/${employee.id}/edit`}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PencilIcon className="h-4 w-4 mr-1" />
          Edit
        </Link>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {employee.first_name} {employee.last_name}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {employee.employee_id || '-'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {employee.email || '-'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {employee.phone || '-'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Company</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {employee.company.name}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Date Added</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {format(new Date(employee.created_at), 'MMM dd, yyyy')}
            </dd>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Employment History
          </h4>
          {employee.employment_history.length > 0 ? (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Department
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Period
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {employee.employment_history.map((history) => (
                    <tr key={history.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {history.department.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {history.role.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(history.start_date), 'MMM yyyy')} -{' '}
                        {history.end_date ? format(new Date(history.end_date), 'MMM yyyy') : 'Present'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {history.is_current ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Past
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No employment history recorded</p>
          )}
        </div>
      </div>
    </div>
  );
}