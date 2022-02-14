import { getUser } from '../service/Api'
const initialState = {
    information: []
};

export const getUserOne = (data) => async (dispatch) => {  
    try {
        const response = await getUser()
        const result = response.data.filter(word => word.username === data.values.username && word.password === data.values.password);
        console.log(data)
        result.length === 1 ? window.location.href = "http://localhost:3000" : alert("Username or password incorrect!!")
    } catch (error) {
        console.error(error);
    }
}
  
export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_ADDRESS":
            return {
                ...state,
                information: [action.data]
                }

        default:
            return state;
    }
}