'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '@/hooks/useAuth';
import Link from 'next/link';

interface RegisterFormData {
  email: string;
  password: string;
  password2: string;
  is_employer: boolean;
}

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const { mutate: registerUser, isLoading } = useRegister();

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Rest of your form code remains the same */}
        </form>
      </div>
    </div>
  );
}