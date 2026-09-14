// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_FAQ, DELETE_FAQ, GET_FAQ, UPDATE_FAQ } from "../constant"
export function creatFaq(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_FAQ,
        payload: data
    }
}
export function getFaq() {
    return {
        type: GET_FAQ,

    }
}
export function updateFaq(data) {
    return {
        type: UPDATE_FAQ,
        payload: data
    }
}
export function deleteFaq(data){
    return{
        type : DELETE_FAQ,
        payload : data
    }
}