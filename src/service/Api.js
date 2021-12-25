import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const getProduct = () => instance.get('coffee');

export const getCategory = () => instance.get('category');