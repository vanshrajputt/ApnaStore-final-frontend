// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_SETTING, DELETE_SETTING, GET_SETTING, UPDATE_SETTING } from "../constant"
export function creatSetting(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_SETTING,
        payload: data
    }
}
export function getSetting() {
    return {
        type: GET_SETTING,

    }
}
export function updateSetting(data) {
    return {
        type: UPDATE_SETTING,
        payload: data
    }
}
export function deleteSetting(data){
    return{
        type : DELETE_SETTING,
        payload : data
    }
}