// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_USER, DELETE_USER, GET_USER, UPDATE_USER } from "../constant"
export function creatUser(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_USER,
        payload: data
    }
}
export function getUser() {
    return {
        type: GET_USER,

    }
}
export function updateUser(data) {
    return {
        type: UPDATE_USER,
        payload: data
    }
}
export function deleteUser(data) {
    return {
        type: DELETE_USER,
        payload: data
    }
}