import {
    FETCH_CATEGORIES,
    FETCH_POSTS,
    ADD_POST
} from '../actions'
import { combineReducers } from 'redux'

// const initialState = {
//     categories: {},
//     posts: {},
//     comments: {}
// }

function categories(state = {}, action) {
    switch(action.type){
        case FETCH_CATEGORIES:
            const {categories} = action
            return categories.reduce((result, category) => {
                result[category.name] = {...category}; 
                return result
            }, {})
        default:
            return state
    }
}

function posts(state = {}, action){
    switch(action.type){
        case ADD_POST:
            const {post} = action
            return {
                ...state,
                [post.id]: {...post}
            }
        case FETCH_POSTS:
            const {posts} = action
            return posts.reduce((result, post) => {
                result[post.id] = {...post}
                return result;
            }, {})
        default:
            return state
    }
}

function comments(state = {}, action){
    switch(action.type){
        default:
            return state
    }
}


export default combineReducers({
    categories,
    posts, 
    comments
})