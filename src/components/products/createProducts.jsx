import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/productService';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateProducts() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleProduct = async (event) => {
        event.preventDefault()

        const newProduct = {
            name: name,
            description: description,
            price: parseFloat(price),
            stock: parseFloat(stock),
        };

        try {
            const response = await addProduct(newProduct);
            console.log('Produto adicionado: ', response)

            toast.success('Produto criado com sucesso!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
                progress: undefined
            })

            setName('');
            setDescription('');
            setPrice('');
            setStock('');

        } catch (error) {
            console.error('Erro ao adicionar produto.', error)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="container mt-4">
                <h2 style={{ color: '#000' }}>Novo Produto</h2>
                <form style={{ padding: '20px', borderRadius: '8px' }}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            placeholder="Digite o nome do produto"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label">Descrição</label>
                        <textarea
                            className="form-control"
                            id="productDescription"
                            rows="3"
                            placeholder="Digite a descrição do produto"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Preço</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productPrice"
                            placeholder="Digite o preço do produto"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="productStock" className="form-label">Estoque</label>
                        <input
                            type="number"
                            className="form-control"
                            id="productStock"
                            placeholder="Digite a quantidade em estoque"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)} />
                    </div>

                    <div className='container-button-createProduct'>
                        <Link to='/products' className='button-back'>
                            <i className="bi bi-arrow-return-left"></i>
                        </Link>
                        <button type="button" onClick={handleProduct} className='button-createProduct'>
                            Criar produto
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
