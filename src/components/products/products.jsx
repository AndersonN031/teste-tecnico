import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function PrivateRouter({ component: Component, ...rest }) {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(token);
        if (!token) {
            navigate('/');
        }

    }, [navigate]);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('authToken');
        navigate('/');
    }

    return (
        <>
            <h1>Bem-vindo a área de produtos!</h1>
            <form onSubmit={handleLogout}>

                <button type="submit">Sair</button>
            </form>
        </>
    )
}