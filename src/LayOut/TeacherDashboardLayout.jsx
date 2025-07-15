import React from 'react';

import { Outlet } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';

const TeacherDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
   
      <main className="flex-grow p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboardLayout;
