import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        if (authToken && (location.pathname === '/login' || location.pathname === '/register')) {
            navigate('/products');
        }
    }, [authToken, location, navigate]);

    return null;
};

export default AuthGuard;