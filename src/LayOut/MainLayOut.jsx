import React from 'react';
import Home from '../Pages/Home';
import { Outlet } from 'react-router';

const MainLayOut = () => {
    return (
        <div className='w-full'>
         
            
             <Outlet></Outlet>
            
        </div>
    );
};

export default MainLayOut;