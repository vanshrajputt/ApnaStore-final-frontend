// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_CART, DELETE_CART, GET_CART, UPDATE_CART } from "../constant"
export function creatCart(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_CART,
        payload: data
    }
}
export function getCart() {
    return {
        type: GET_CART,

    }
}
export function updateCart(data) {
    return {
        type: UPDATE_CART,
        payload: data
    }
}
export function deleteCart(data){
    return{
        type : DELETE_CART,
        payload : data
    }
}