import React from 'react';
import { Outlet } from 'react-router';

const AuthLayOut = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayOut;