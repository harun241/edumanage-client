import React from 'react';

import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
    

      <main className="flex-grow p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
