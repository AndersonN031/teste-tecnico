import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductId, handleUpdateProduct } from "../../controllers/productController";
import { toast, ToastContainer } from "react-toastify";


export default function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0
    });

    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchProductId(id, setProduct)

        }
    }, [token, navigate, id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const parsedValue = id === 'price' || id === 'stock' ? parseFloat(value) : value;

        setProduct((prevProduct) => ({
            ...prevProduct,
            [id]: isNaN(parsedValue) ? '' : parsedValue
        }));
    };

    const updateProduct = async (e) => {
        e.preventDefault()
        try {
            await handleUpdateProduct(id, product)
            toast.success('Produto atualizado com sucesso!', {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
                progress: undefined
            })

            setTimeout(() => {
                navigate('/products');

            }, 2000)
        } catch (error) {
            toast.error('Erro ao tentar atualizar o produto.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
                progress: undefined
            })
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container mt-4">
                <h2 style={{ color: '#000' }}>Atualizar Produto</h2>
                <form style={{ padding: '20px', borderRadius: '8px' }} onSubmit={updateProduct}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Digite o nome do produto" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descrição</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={product.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Digite a descrição do produto" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Preço</label>
                        <input
                            type="number"
                            id="price"
                            className="form-control"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Digite o preço do produto" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">Estoque</label>
                        <input
                            type="number"
                            id="stock"
                            className="form-control"
                            value={product.stock}
                            onChange={handleChange}
                            placeholder="Digite a quantidade em estoque" />
                    </div>

                    <div className='container-button-createProduct'>
                        <Link to='/products' className='button-back'>
                            <i className="bi bi-arrow-return-left"></i>
                        </Link>
                        <button type="submit" className='button-createProduct'>
                            Atualizar produto
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}