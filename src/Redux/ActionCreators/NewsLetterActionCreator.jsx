// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_NEWSLETTER, DELETE_NEWSLETTER, GET_NEWSLETTER, UPDATE_NEWSLETTER } from "../constant"
export function creatNewsLetter(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_NEWSLETTER,
        payload: data
    }
}
export function getNewsLetter() {
    return {
        type: GET_NEWSLETTER,

    }
}
export function updateNewsLetter(data) {
    return {
        type: UPDATE_NEWSLETTER,
        payload: data
    }
}
export function deleteNewsLetter(data){
    return{
        type : DELETE_NEWSLETTER,
        payload : data
    }
}