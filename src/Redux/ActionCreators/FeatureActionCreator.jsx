// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_FEATURE, DELETE_FEATURE, GET_FEATURE, UPDATE_FEATURE } from "../constant"
export function creatFeature(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_FEATURE,
        payload: data
    }
}
export function getFeature() {
    return {
        type: GET_FEATURE,

    }
}
export function updateFeature(data) {
    return {
        type: UPDATE_FEATURE,
        payload: data
    }
}
export function deleteFeature(data){
    return{
        type : DELETE_FEATURE,
        payload : data
    }
}