import React from 'react';

import { Outlet } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';

const TeacherDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 shadow">
        <TeacherSidebar />
      </aside>

      <main className="flex-grow p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboardLayout;
