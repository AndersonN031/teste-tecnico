import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        if (!authToken) {
            navigate('/');
        } else if (authToken && (location.pathname === '/' || location.pathname === '/register')) {
            navigate('/products');
        }
    }, [authToken, location, navigate]);

    return null;
};

export default AuthGuard;