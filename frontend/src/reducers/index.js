import {
    RECEIVE_CATEGORIES,
    RECEIVE_POSTS,
    RECEIVE_POST,
    ADD_POST,
    UPDATE_POST
} from '../actions'
import { combineReducers } from 'redux'

// const initialState = {
//     categories: {},
//     posts: {},
//     comments: {}
// }

function categories(state = {}, action) {
    switch(action.type){
        case RECEIVE_CATEGORIES:
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
    const {post, posts} = action
    switch(action.type){
        case ADD_POST:
            return {
                ...state,
                [post.id]: {...post}
            }
        case RECEIVE_POSTS:
            return posts.reduce((result, post) => {
                result[post.id] = {...post}
                return result;
            }, {})
        case UPDATE_POST:
            return {
                ...state,
                [post.id]: {...post}
            }
        case RECEIVE_POST:
            return {
                [post.id]: {...post}
            }
        default:
            return state
    }
}

function comments(state = {}, action){
    const {post, comments} = action
    switch(action.type){
        case RECEIVE_POST:
            return {
                [post.id]: {...comments}
            }
        default:
            return state
    }
}

export default combineReducers({
    categories,
    posts, 
    comments
})