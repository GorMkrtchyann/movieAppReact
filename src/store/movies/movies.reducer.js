import {ADD_COMMENT_MOVIE, DELETE_MOVIES} from "./movies.types";

const initialStore = {
    moviesList: []
}

export const moviesReducer = (store = initialStore, action) => {
    switch (action.type){
        case DELETE_MOVIES:
            return {
                ...store,
                moviesList: []
            }
        case ADD_COMMENT_MOVIE:
            return {
                ...store,
                moviesList: action.payload
            }
        default:
            return store
    }
}