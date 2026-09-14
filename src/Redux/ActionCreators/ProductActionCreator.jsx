// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT } from "../constant"
export function creatProduct(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_PRODUCT,
        payload: data
    }
}
export function getProduct() {
    return {
        type: GET_PRODUCT,

    }
}
export function updateProduct(data) {
    return {
        type: UPDATE_PRODUCT,
        payload: data
    }
}
export function deleteProduct(data){
    return{
        type : DELETE_PRODUCT,
        payload : data
    }
}