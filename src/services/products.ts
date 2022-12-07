import axios from 'axios'
const API_URL = 'http://localhost:3000'

const axiosInstance = axios.create({
    method: 'POST',
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * Trigger the Bright Data collector to fetch the list of {product} from several competitors
 * @returns {Promise} Promise object represents the list of products
 */
export function fetchProducts(product: string): Promise<{ success: boolean }> {
    return axiosInstance.post('/products', { product })
}