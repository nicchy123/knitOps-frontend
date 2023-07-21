import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contents/AuthProvider';


const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user,loading } = useContext(AuthContext);
    if (user) {
        return children
    }
    if(loading){
        return <div className='min-h-[100vh] flex justify-center items-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    return <Navigate to="/signin" state={{ from: location }} replace />
};

export default PrivateRoute;