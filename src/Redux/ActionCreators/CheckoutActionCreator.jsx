// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_CHECKOUT, DELETE_CHECKOUT, GET_CHECKOUT, UPDATE_CHECKOUT } from "../constant"
export function creatCheckout(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_CHECKOUT,
        payload: data
    }
}
export function getCheckout() {
    return {
        type: GET_CHECKOUT,

    }
}
export function updateCheckout(data) {
    return {
        type: UPDATE_CHECKOUT,
        payload: data
    }
}
export function deleteCheckout(data){
    return{
        type : DELETE_CHECKOUT,
        payload : data
    }
}