import * as api from '../utils/api'

export const RECEIVE_CATEGORIES = 'FETCH_CATEGORIES'

export const RECEIVE_POSTS = 'FETCH_POSTS'
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
        categories => dispatch(receiveCategories(categories))
    )
)

export const receivePosts = posts => ({
        type: RECEIVE_POSTS,
        posts
})

export const fetchAllPosts = () => dispatch => (
    api.getAllPosts().then(
        posts => dispatch(receivePosts(posts))
    )
)

export const fetchPostsByCategory = (category) => dispatch => (
    api.getPostsByCategory(category).then(
        posts => dispatch(receivePosts(posts))
    )
)

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}
