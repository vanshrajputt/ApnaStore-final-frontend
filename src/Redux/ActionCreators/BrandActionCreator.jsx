// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_BRAND, DELETE_BRAND, GET_BRAND, UPDATE_BRAND } from "../constant"
export function creatBrand(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_BRAND,
        payload: data
    }
}
export function getBrand() {
    return {
        type: GET_BRAND,

    }
}
export function updateBrand(data) {
    return {
        type: UPDATE_BRAND,
        payload: data
    }
}
export function deleteBrand(data){
    return{
        type : DELETE_BRAND,
        payload : data
    }
}