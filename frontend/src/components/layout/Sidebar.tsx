'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProfile } from '@/hooks/useAuth';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: ChartBarIcon,
    roles: ['employer', 'talent_verify'],
  },
  {
    name: 'Companies',
    href: '/companies',
    icon: BuildingOfficeIcon,
    roles: ['talent_verify'],
  },
  {
    name: 'Employees',
    href: '/employees',
    icon: UserGroupIcon,
    roles: ['employer', 'talent_verify'],
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: DocumentTextIcon,
    roles: ['employer', 'talent_verify'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
    roles: ['employer', 'talent_verify'],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: profile } = useProfile();

  if (!profile) return null;

  const userRole = profile.is_talent_verify_staff ? 'talent_verify' : 'employer';

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-bold text-indigo-600">TalentVerify</span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    pathname === item.href
                      ? 'text-indigo-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}