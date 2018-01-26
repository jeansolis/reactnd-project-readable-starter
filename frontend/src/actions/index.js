import * as api from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES' //Implemented

export const RECEIVE_POSTS = 'RECEIVE_POSTS' //Implemented
export const RECEIVE_POST = 'RECEIVE_POST' //Implemented
export const ADD_POST = 'ADD_POST' 
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPVOTE_POST = 'UPVOTE_POST' //Implemented
export const DOWNVOTE_POST = 'DOWNVOTE_POST' //Implemented

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

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

export const receivePost = (post, comments) => ({
    type: RECEIVE_POST,
    post,
    comments
})

export const fetchPost = postID => dispatch => {
    api.getPost(postID).then(
        post => api.getComments(postID).then(
            comments => dispatch(receivePost(post, comments))
        )
        //post => dispatch(receivePost(post))
    )
}

export const receiveUpdatedPost = post => ({
    type: UPDATE_POST,
    post
})

export const upVotePost = (id, option) => dispatch => {
    api.votePost(id, option).then(
        post => dispatch(receiveUpdatedPost(post))   
    )
}

export const downVotePost = (id, option) => dispatch => {
    api.votePost(id, option).then(
        post => dispatch(receiveUpdatedPost(post))
    )
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export const fetchComments = postID => dispatch => {
    api.getComments(postID).then(
        comments => dispatch(receiveComments(comments))
    )
}

export const receiveUpdateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
})

export const voteComment = (commentID, option) => dispatch => {
     api.voteComment(commentID, option).then(
         comment => dispatch(receiveUpdateComment(comment))
     )
 }