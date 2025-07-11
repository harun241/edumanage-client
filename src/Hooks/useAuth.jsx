import { useContext } from 'react';
import Authcontext from '../context/Authcontext';

const useAuth = () => {
    const authInfo = useContext(Authcontext);
    return authInfo;
};

export default useAuth;
