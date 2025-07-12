import React from 'react';

import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 shadow">
        <AdminSidebar />
      </aside>

      <main className="flex-grow p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
