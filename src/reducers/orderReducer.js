import { addOrder,getOrders, deleteOrder } from "../service/Api";

const initialState = {
    order: [],
    newOrder:[]
};

export const getOrderList = () => async (dispatch) => {
    try {
        const response = await getOrders()
        dispatch({ type: 'GET_ORDER', data: response?.data })
    } catch (error) {
        console.error(error);
    }
}

export const addOneOrder = (data) => async (dispatch) => {
    try {
        const response = await addOrder(data)
        dispatch({ type: 'GET_NEW_ORDER', data : response.data})
        dispatch({ type: 'REMOVE_ALL'})
    } catch (error) {
        console.error(error);
    }
}

export const ClearOrder = (data) => async (dispatch) => {
    try {
        dispatch({ type: 'ADD_TO_ORDER', data: data.order })
    } catch (error) {
        console.error(error);
    }
}

export const deleteOneOrder = (data) => async (dispatch) => {
    try {
        deleteOrder(data?._id)
        alert("delete order")
        dispatch(getOrderList())
    } catch (error) {
        console.error(error);
    }
}
  
export default function itemReducer(state = initialState, action) {
    switch (action.type) {

        case "GET_ORDER":
            return {
                order: action.data.reverse()
            };
        
        case "GET_NEW_ORDER":
            return {
                newOrder: action.data
            }; 

        case "ADD_TO_ORDER":
            return {
                order: [...state.order, action.data]
                };        

        case "REMOVE_ALL_ORDER":
            return {
                ...state,
                order: []
            }

        case "DELETE_ONE_ORDER":
            return {
                ...state,
                order: [...state.filter(x => x._id !== action.data._id)]
            }
            
        default:
            return state;
    }
}