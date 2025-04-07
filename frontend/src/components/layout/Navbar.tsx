'use client';

import Link from 'next/link';
import { useProfile } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useAuth';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { data: profile } = useProfile();
  const logout = useLogout();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard">
                <span className="text-xl font-bold text-indigo-600">TalentVerify</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {profile && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  {profile.email}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}