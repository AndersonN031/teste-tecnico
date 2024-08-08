import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const apiUrl = import.meta.env.VITE_API_URL;

export default function Register() {
    const [name, setName] = useState('')
    const [taxNumber, setTaxNumber] = useState('')
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const validateForm = () => {
        // Validação de campos obrigatórios
        if (!name || !taxNumber || !mail || !phone || !password) {
            setError('Todos os campos são obrigatórios!');
            return false;
        }

        // Validação de CPF/CNPJ
        const isCPF = taxNumber.length === 11;
        const isCNPJ = taxNumber.length === 14;
        if (!isCPF && !isCNPJ) {
            setError('CPF inválido ou já em uso!');
            return false;
        }

        // Validação de telefone 
        const phonePattern = /^\d{10,11}$/;
        if (!phonePattern.test(phone)) {
            setError('Número de telefone inválido!');
            return false;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordPattern.test(password)) {
            setError(`Senha deve ter pelo menos 8 caracteres - Obrigatório pelo menos 1 letra maiúscula, minúscula e 1 número`);
            return false;
        }

        return true;
    }

    const handleRegister = (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        axios.post(`${apiUrl}/register`, {
            name: name,
            taxNumber: taxNumber,
            mail: mail,
            phone: phone,
            password
        })
            .then(response => {
                console.log('Registro efetuado com sucesso!');
                console.log('Resposta: ', response.data);
                toast.success('Conta criada com sucesso!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "colored",
                    progress: undefined
                })
                setError('');

                setTimeout(() => {
                    navigate('/')
                }, 3000);
            })
            .catch(error => {
                console.error('Erro ao realizar o registro:', error);
                setError('Erro ao criar conta, tente novamente!');
            });
    }

    return (
        <>
            <ToastContainer />
            <div className="register-container">
                <form onSubmit={handleRegister} className="register-form">
                    <h1>Crie uma conta</h1>
                    <div className="input-group">
                        <span className="input-icon">
                            <i className="bi bi-person"></i>
                        </span>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field" />
                    </div>
                    <div className="input-group">
                        <span className="input-icon">
                            <i className="bi bi-file-earmark-text"></i>
                        </span>
                        <input
                            type="text"
                            placeholder="CPF"
                            value={taxNumber}
                            onChange={(e) => setTaxNumber(e.target.value)}
                            className="input-field" />
                    </div>
                    <div className="input-group">
                        <span className="input-icon">
                            <i className="bi bi-envelope"></i>
                        </span>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            className="input-field" />
                    </div>
                    <div className="input-group">
                        <span className="input-icon">
                            <i className="bi bi-telephone"></i>
                        </span>
                        <input
                            type="tel"
                            placeholder="Telefone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                    {error && <div className="error-message">{error}</div>}
                    <div className="button-group">
                        <button type="submit" className="register-button">Registrar</button>
                        <Link to={'/'} className="login-link">Já tem uma conta?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}
