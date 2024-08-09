import { addProduct, deleteProduct, getProductId, getProducts, updateProduct } from "../services/productService"

export const showProducts = async () => {
    try {
        const product = await getProducts()
        return product

    } catch (error) {
        console.error('Erro ao carregar o produto', error)
    }
}

export const fetchProductId = async (id, setProduct) => {
    try {
        const data = await getProductId(id)
        setProduct(data.data.product)
    } catch (error) {
        console.error('Erro ao tentar atualizar o produto', error)
    }
}

export const handleUpdateProduct = async (id, product) => {
    try {
        const { success, message, data, ...payload } = product;

        await updateProduct(id, payload);
    } catch (error) {
        console.error('Erro ao atualizar o produto', error)
    }
}

export const handleDeleteProduct = async (id) => {
    try {
        await deleteProduct(id)
    } catch (error) {
        console.log('Erro ao deletar o produto', error)
    }
}