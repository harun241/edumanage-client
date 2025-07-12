import React from 'react';
import StudentSidebar from '../components/StudentSidebar';  
import { Outlet } from 'react-router-dom';

const StudentDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 shadow">
        <StudentSidebar />
      </aside>

      <main className="flex-grow p-6 bg-white">
        
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboardLayout;
