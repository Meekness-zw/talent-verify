import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { QueryClientProviders } from '@/providers/query-client-provider';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TalentVerify - Dashboard',
  description: 'Talent verification system dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProviders>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex pt-16">
              <Sidebar />
              <main className="flex-1 md:pl-64">
                <div className="py-6 px-4 sm:px-6 lg:px-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </QueryClientProviders>
      </body>
    </html>
  );
}