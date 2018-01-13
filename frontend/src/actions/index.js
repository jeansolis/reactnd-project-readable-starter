import * as api from '../utils/api'

export const RECEIVE_CATEGORIES = 'FETCH_CATEGORIES'

export const FETCH_POSTS = 'FETCH_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    api.getCategories().then(
        categories => dispatch(
            receiveCategories(categories)
        )
    )
)

export function fetchPosts(posts) {
    return {
        type: FETCH_POSTS,
        posts
    }
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}
