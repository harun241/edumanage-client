import React from 'react';

import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Chart from '../components/Chart';
import DashboardOverview from '../components/DashboardOverview';

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
    

      <main className="flex-grow p-6 bg-white">
       <div className='flex items-baseline'>  <Chart></Chart>
   <DashboardOverview></DashboardOverview>
        </div>
        <Outlet />
        
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
