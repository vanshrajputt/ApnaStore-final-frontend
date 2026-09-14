// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_SUBCATEGORY, DELETE_SUBCATEGORY, GET_SUBCATEGORY, UPDATE_SUBCATEGORY } from "../constant"
export function creatSubCategory(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_SUBCATEGORY,
        payload: data
    }
}
export function getSubCategory() {
    return {
        type: GET_SUBCATEGORY,

    }
}
export function updateSubCategory(data) {
    return {
        type: UPDATE_SUBCATEGORY,
        payload: data
    }
}
export function deleteSubCategory(data){
    return{
        type : DELETE_SUBCATEGORY,
        payload : data
    }
}