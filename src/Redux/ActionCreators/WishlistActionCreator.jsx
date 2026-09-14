// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_WISHLIST, DELETE_WISHLIST, GET_WISHLIST, UPDATE_WISHLIST } from "../constant"
export function creatWishlist(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_WISHLIST,
        payload: data
    }
}
export function getWishlist() {
    return {
        type: GET_WISHLIST,

    }
}
export function updateWishlist(data) {
    return {
        type: UPDATE_WISHLIST,
        payload: data
    }
}
export function deleteWishlist(data){
    return{
        type : DELETE_WISHLIST,
        payload : data
    }
}