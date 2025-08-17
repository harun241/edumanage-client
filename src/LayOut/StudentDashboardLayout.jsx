import React from 'react';
import { Outlet } from 'react-router-dom';
import Chart from '../components/Chart';
import DashboardOveriew from '../components/DashboardOverview';


const StudentDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
   

      <main className="flex-grow p-6 bg-white">
      <div className='flex items-baseline'>  <Chart></Chart>
   <DashboardOveriew></DashboardOveriew>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboardLayout;
