// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_MAINCATEGORY, DELETE_MAINCATEGORY, GET_MAINCATEGORY, UPDATE_MAINCATEGORY } from "../constant"
export function creatMainCategory(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_MAINCATEGORY,
        payload: data
    }
}
export function getMainCategory() {
    return {
        type: GET_MAINCATEGORY,

    }
}
export function updateMainCategory(data) {
    return {
        type: UPDATE_MAINCATEGORY,
        payload: data
    }
}
export function deleteMainCategory(data){
    return{
        type : DELETE_MAINCATEGORY,
        payload : data
    }
}