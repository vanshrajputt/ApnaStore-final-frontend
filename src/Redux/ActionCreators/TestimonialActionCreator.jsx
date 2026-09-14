// Yeh functions Redux ko batate hain ki application me kya action perform karna hai.

import { CREATE_TESTIMONIAL, DELETE_TESTIMONIAL, GET_TESTIMONIAL, UPDATE_TESTIMONIAL } from "../constant"
export function creatTestimonial(data) {
    // Jab  nayi category create karte h
    // payload → kya data bhejna hai (category ka data)
    return {
        type: CREATE_TESTIMONIAL,
        payload: data
    }
}
export function getTestimonial() {
    return {
        type: GET_TESTIMONIAL,

    }
}
export function updateTestimonial(data) {
    return {
        type: UPDATE_TESTIMONIAL,
        payload: data
    }
}
export function deleteTestimonial(data){
    return{
        type : DELETE_TESTIMONIAL,
        payload : data
    }
}