import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        if (!authToken) {
            if (location.pathname !== '/' && location.pathname !== '/register') {
                navigate('/', { replace: true });
            }
        } else if (authToken && (location.pathname === '/' || location.pathname === '/register')) {
            navigate('/products', { replace: true });
        }
    }, [authToken, location.pathname, navigate]);

    return null;
};

export default AuthGuard;
