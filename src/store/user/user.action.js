import {ADD_UPDATE_USER_LIST} from "./user.types";


export const addUpdateUserList = ( list ) => {
    return{
        type: ADD_UPDATE_USER_LIST,
        payload: list
    }
}