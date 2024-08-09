import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleDeleteProduct, showProducts } from "../../controllers/productController";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast, ToastContainer } from "react-toastify";

const themeColor = '#0064ff';

const StyledTableCell = styled(TableCell)({
    backgroundColor: themeColor,
    color: '#fff',
});

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f9f9f9',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#f1f1f1',
    },
});


export default function PrivateRouter() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    function priceFormater(number) {
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await showProducts();
                setProducts(fetchedProducts.data.products);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProducts();
        } else {
            navigate('/');
        }


    }, [token, navigate]);

    const removeProduct = async (productId) => {
        try {
            await handleDeleteProduct(productId);
            setProducts(products.filter(product => product.id !== productId));
            toast.error('Produto excluído com sucesso!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
                progress: undefined
            })
        } catch (error) {
            console.error('Erro ao tentar deletar produto.', error)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('authToken');
        navigate('/');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleLogout} style={{ margin: '20px', textAlign: 'end' }}>
                <button type="submit" className="login-button" >
                    <div className="container-button-logout">
                        <i className="bi bi-box-arrow-right"></i>
                        Sair
                    </div>
                </button>
            </form>
            <Container maxWidth="md" >

                <Typography variant="h4" gutterBottom >
                    <div className="container-link-createProduct">
                        Product List
                        <Link to={'/createProducts'} className="link-createProduct">
                            Criar produto
                        </Link>
                    </div>
                </Typography>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Produto</StyledTableCell>
                                <StyledTableCell>Descrição</StyledTableCell>
                                <StyledTableCell>Preço</StyledTableCell>
                                <StyledTableCell>Qnt</StyledTableCell>
                                <StyledTableCell>Ações</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <StyledTableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{priceFormater(product.price)}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>
                                            <div className="container-actions">
                                                <Link to={`/updateProduct/${product.id}`}>
                                                    <Button variant="contained" color="primary" >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                </Link>
                                                <Button variant="contained" color="warning" onClick={() => removeProduct(product.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No products available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </>
    )
}
