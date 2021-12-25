import { getProduct, getCategory } from '../service/Api'

const initialState = {
    products: [],
    cart: [],
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

export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DATA":
            return {
                ...state,
                products: action?.data
            }

        case "GET_CATEGORY":
            return {
                ...state,
                categories: action?.data
            }

        case "ADD_TO_CART":
            const isIndExisted = state.cart?.findIndex(e => e?.id === action.data?.id)
            if (isIndExisted !== -1) {
                state.cart[isIndExisted].quantity = state.cart[isIndExisted].quantity + action.data.quantity
                return {
                    ...state,
                    cart: [...state.cart]
                }
            } else {
                return {
                    cart: [...state.cart, action.data]
                };
            }

        case "INCREASE_QUANTITY":
            const isIndExistedIncreaseQuantity = state.cart?.findIndex(e => e?.id === action.data?.id)
            state.cart[isIndExistedIncreaseQuantity].quantity = state.cart[isIndExistedIncreaseQuantity].quantity + 1
            return {
                ...state,
                cart: [...state.cart]
            }

        case "REDUCE_QUANTITY":
            const isIndExistedReduceQuantity = state.cart?.findIndex(e => e?.id === action.data?.id)
            state.cart[isIndExistedReduceQuantity].quantity = state.cart[isIndExistedReduceQuantity].quantity - 1
            return {
                ...state,
                cart: [...state.cart]
            }

        case "REMOVE_CART":
            return {
                ...state,
                cart: [...state.cart.filter(item => item?.id !== action.data?.id)]
            }

        case "REMOVE_ALL":
            return {
                ...state,
                cart: []
            }

        default:
            return state;
    }
}