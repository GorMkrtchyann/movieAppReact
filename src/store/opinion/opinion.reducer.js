import {ADD_OPINION} from "./opinion.types";


const initialStore = {
    opinions: [
        {id: 1, name: "Armen", paragraph: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", likes: 0},
        {id: 2, name: "Ara", paragraph: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", likes: 14},
        {id: 3, name: "John", paragraph: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", likes: 2},
        {id: 4, name: "Shot", paragraph: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", likes: 0},
        {id: 5, name: "Armen", paragraph: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", likes: 300}
    ]
}

export const opinionReducer = (store = initialStore, action) => {
    switch (action.type){
        case ADD_OPINION:
            return {
                ...store,
                opinions: action.payload
            }
        default:
            return store
    }
}