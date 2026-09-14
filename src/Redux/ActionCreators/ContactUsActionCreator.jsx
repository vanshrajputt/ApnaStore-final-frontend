// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_CONTACT_US, DELETE_CONTACT_US, GET_CONTACT_US, UPDATE_CONTACT_US } from "../constant"
export function creatContactUs(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_CONTACT_US,
        payload: data
    }
}
export function getContactUs() {
    return {
        type: GET_CONTACT_US,

    }
}
export function updateContactUs(data) {
    return {
        type: UPDATE_CONTACT_US,
        payload: data
    }
}
export function deleteContactUs(data){
    return{
        type : DELETE_CONTACT_US,
        payload : data
    }
}