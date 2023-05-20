import {ADD_OPINION} from "./opinion.types";


export const addOpinion = ( opinion ) => {
    return{
        type: ADD_OPINION,
        payload: opinion
    }
}