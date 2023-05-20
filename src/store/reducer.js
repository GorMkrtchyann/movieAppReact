import {combineReducers} from "redux";
import {moviesReducer} from "./movies/movies.reducer";
import {opinionReducer} from "./opinion/opinion.reducer";
import {userReducer} from "./user/user.reducer";


export const reducer = combineReducers({
    moviesReducer,
    opinionReducer,
    userReducer
})