import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const getProduct = () => instance.get('coffee');
export const addProduct = (data) => instance.post('coffee/add', data);
export const updateProduct = (data) => instance.post('coffee/upd/'+ data._id, data);
export const deleteProduct = (id) => instance.post('coffee/del/'+ id);

export const getCategory = () => instance.get('category');


