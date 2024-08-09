import axios from "axios";

const productUrl = import.meta.env.VITE_PRODUCT_URL

export async function getProducts() {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(`${productUrl}/get-all-products`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error("Erro ao buscar produtos:", error.message)
        return [];
    }
}

export const getProductId = async (id) => {
    const token = localStorage.getItem('authToken');
    try {

        const reponse = await axios.get(`${productUrl}/get-one-product/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return reponse.data
    } catch (error) {

    }
}

export const addProduct = async (products) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.post(`${productUrl}/create-product`, products, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        return response.data
    } catch (error) {
        console.error("Erro ao adicionar produto:", error.message)
        return [];
    }
}

export const updateProduct = async (id, product) => {
    const token = localStorage.getItem('authToken');
    const { name, description, price, stock } = product;

    // Construir o payload com as propriedades corretas
    const payload = {
        name,
        description,
        price,
        stock
    };
    
    try {
        const response = await axios.patch(`${productUrl}/update-product/${id}`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao tentar atualizar produto:', error.message);
        if (error.response) {
            console.log('Detalhes do erro:', error.response.data);
        }
    }
};

export const deleteProduct = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.delete(`${productUrl}/delete-product/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log("Produto deletado: ", response.data)
        return response.data
    } catch (error) {
        console.error("Erro ao deletar produto:", error.message)
    }
}