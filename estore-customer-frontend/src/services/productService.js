import axios from 'axios'

const BASE_URL = 'http://localhost:4041/api/products'

export const getAllProducts = () => {
    return axios.get(BASE_URL);
};