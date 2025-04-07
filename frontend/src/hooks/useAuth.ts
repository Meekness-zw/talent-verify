/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { setToken, removeToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  password2: string;
  is_employer: boolean;
}

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post('/login/', data);
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.access);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.push('/dashboard');
      toast.success('Logged in successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Login failed');
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post('/register/', data);
      return response.data;
    },
    onSuccess: () => {
      router.push('/login');
      toast.success('Registration successful. Please login.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.email?.[0] || 'Registration failed');
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/profile/');
      return response.data;
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    removeToken();
    queryClient.clear();
    router.push('/login');
    toast.success('Logged out successfully');
  };
};