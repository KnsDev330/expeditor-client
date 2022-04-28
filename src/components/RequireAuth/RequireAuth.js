import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase.init';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (loading) return;

    if (!user) {
        toast.error(`Please Login First`, {
            position: "top-right",
            autoClose: 2000
        });
        localStorage.setItem("toLocation", JSON.stringify(location));
        return <Navigate to="/login" replace />;
    }
    return children;

};

export default RequireAuth;