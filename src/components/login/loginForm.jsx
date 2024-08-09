import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from "../../images/logo.png"
const apiUrl = import.meta.env.VITE_API_URL;



export default function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        setError('');


        if (!cpf || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        axios.post(`${apiUrl}/login`, {
            taxNumber: cpf,
            password,

        })
            .then(response => {
                const token = response.data.data.token;
                localStorage.setItem('authToken', token);

                navigate('/products')
            })
            .catch(error => {
                setError('Credenciais incorretas. Verifique seu CPF e senha.');
                setCpf('');
                setPassword('');
            });
    };




    return (
        <>
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">

                    <h1>
                        <img src={logo} alt="logo T-Alpha" />
                        Inicie sua sessão!
                    </h1>
                    {error && (
                        <div className="error-message" style={{ color: 'red' }}>
                            {error}
                        </div>
                    )}
                    <div className="input-group">
                        <span className="input-icon">
                            <i className="bi bi-person"></i>
                        </span>
                        <input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            className="input-field" />
                    </div>
                    <div className="input-group">
                        <span className="input-icon">
                            <i className="bi bi-lock"></i>
                        </span>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field" />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="login-button">Login</button>
                        <Link to="/register" className="register-link">Registrar</Link>
                    </div>
                </form>
            </div>
        </>
    );
}