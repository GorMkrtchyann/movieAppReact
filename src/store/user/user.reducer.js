import {ADD_UPDATE_USER_LIST} from "./user.types";

const initialStore = {
    users: []
}


export const userReducer = (store = initialStore, action) => {
    switch (action.type){
        case ADD_UPDATE_USER_LIST:
            return {
                ...store,
                users: action.payload
            }
        default:
            return store
    }
}