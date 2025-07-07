import React, { use } from 'react';
import Authcontext from '../context/Authcontext';


const useAuth = () => {
    const authInfo=use(Authcontext);
    return authInfo;
};

export default useAuth;