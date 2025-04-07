'use client';

import { useProfile } from '@/hooks/useAuth';
import { BuildingOfficeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { data: profile } = useProfile();

  if (!profile) return null;

  const stats = [
    { name: 'Total Companies', value: '12', icon: BuildingOfficeIcon },
    { name: 'Total Employees', value: '245', icon: UserGroupIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {profile.email}
        </p>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <div className="flex items-center">
                <div className="rounded-md bg-indigo-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-4">
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item} className="py-4">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <UserGroupIcon className="h-5 w-5 text-indigo-500" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-800">
                            <span className="font-medium text-gray-900">
                              New employee
                            </span>{' '}
                            added to the system
                          </p>
                          <p className="text-sm text-gray-500">
                            2 days ago
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Employee
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Generate Report
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Bulk Upload
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View All Employees
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}