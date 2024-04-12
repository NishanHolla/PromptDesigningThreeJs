import React, { Suspense } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSnapshot } from 'valtio'; // Import the authentication state

const PrivateRoute = ({ children, ...rest }) => {
    const { isLoggedIn } = useSnapshot(authState); 

    return (
        <Route {...rest}>
            {isLoggedIn ? (
                children
            ) : (
                <Navigate to="/login" replace />
            )}
            {!isLoggedIn && (
                <Suspense fallback={<div>Checking login...</div>}>
                    <Outlet />
                </Suspense>
            )}
        </Route>
    );
};

export default PrivateRoute;
