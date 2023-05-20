import {ADD_COMMENT_MOVIE, DELETE_MOVIES} from "./movies.types";


export const deleteMovies = () => {
    return{
        type: DELETE_MOVIES
    }
}

export const addComment = ( newList ) => {
    return{
        type: ADD_COMMENT_MOVIE,
        payload: newList
    }
}

export const addMovie = ( newList ) => {
    return{
        type: ADD_COMMENT_MOVIE,
        payload: newList
    }
}