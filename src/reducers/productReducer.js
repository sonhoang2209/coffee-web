import { getProduct, getCategory, updateProduct, addProduct,deleteProduct } from '../service/Api'

const initialState = {
    products: [],
    categories: []
};

export const getProductList = () => async (dispatch) => {
    try {
        const response = await getProduct()
        dispatch({ type: 'GET_DATA', data: response?.data })
         
    } catch (error) {
        console.error(error);
    }
}

export const getCategoryList = () => async (dispatch) => {
    try {
        const response = await getCategory()
        dispatch({ type: 'GET_CATEGORY', data: response?.data })
    } catch (error) {
        console.error(error);
    }
}

export const addOneProduct = (data) => async (dispatch) => {
    try {
        addProduct(data.values)
        dispatch({ type: 'ADD_PRODUCT', data: data.values })
        alert("success")
        dispatch(getProductList())
    } catch (error) {
        console.error(error);
    }
}

export const deleteOneProduct = (data) => async (dispatch) => {
    try {
        deleteProduct(data)
        dispatch({ type: 'DELETE_PRODUCT', data: data })
        alert("delete project")
        dispatch(getProductList())
    } catch (error) {
        console.error(error);
    }
}

export const updateProductDetail = (data) => async (dispatch) => {
    try {
        updateProduct(data.values)
        dispatch({ type: 'UPDATE_PRODUCT', data: data.values })
        alert("update success")
        dispatch(getProductList())
    } catch (error) {
        console.error(error);
    }
}

export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DATA":
            return {
                ...state,
                products: action?.data.reverse()
            }

        case "GET_CATEGORY":
            return {
                ...state,
                categories: action?.data
            }

        case "ADD_PRODUCT":
            return {
                ...state,
                products: [ action?.data, ...state.products]
            }

        case "UPDATE_PRODUCT":
            const isUpd = state.products?.findIndex(e => e?._id === action.data?._id)
            state.products[isUpd] = action.data
            return {
                ...state,
                products: [...state.products]
            }

        case "DELETE_PRODUCT":
            console.log(action.data)
            return {
                ...state,
                products: [...state.products.filter(item => item?._id !== action.data)]
            }

        case "REMOVE_ALL_PRODUCT":
            return {
                ...state,
                products: []
            }

        default:
            return state;
    }
}