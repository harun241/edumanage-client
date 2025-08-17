import React from 'react';

import { Outlet } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import Chart from '../components/Chart';
import DashboardOverview from '../components/DashboardOverview';


const TeacherDashboardLayout = () => {
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

export default TeacherDashboardLayout;
