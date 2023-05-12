

export const DELETE_MOVIES = "DELETE_MOVIES"
export const ADD_COMMENT = "ADD_COMMENT"
export const ADD_MOVIE = "ADD_MOVIE"

export const deleteMovies = () => {
    return{
        type: DELETE_MOVIES
    }
}

export const addComment = ( newList ) => {
    return{
        type: ADD_COMMENT,
        payload: newList
    }
}

export const addMovie = ( newList ) => {
    return{
        type: ADD_COMMENT,
        payload: newList
    }
}