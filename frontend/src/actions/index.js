import * as api from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES' //Implemented

export const RECEIVE_POSTS = 'RECEIVE_POSTS' //Implemented
export const RECEIVE_POST = 'RECEIVE_POST' //Implemented
export const ADD_POST = 'ADD_POST' //Implemented
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPVOTE_POST = 'UPVOTE_POST' //Implemented
export const DOWNVOTE_POST = 'DOWNVOTE_POST' //Implemented

export const ADD_COMMENT = 'ADD_COMMENT' //Implemented
export const REMOVE_COMMENT = 'REMOVE_COMMENT' //Implemented
export const UPDATE_COMMENT = 'UPDATE_COMMENT' //Implemented
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS' //Implemented

//CATEGORIES ACTIONS

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    api.getCategories().then(
        categories => dispatch(receiveCategories(categories))
    )
)

//POST ACTIONS

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

export const fetchPost = postID => dispatch => {
    api.getPost(postID).then(
        post => api.getComments(postID).then(
            comments => dispatch(receivePost(post, comments))
        )
    )
}

export const receivePost = (post, comments) => ({
    type: RECEIVE_POST,
    post,
    comments
})

export const addPost = (post) => dispatch => {
    api.addPost(post).then(
        post => dispatch(postAdded(post))
    )    
 }
 
 export const postAdded = (post) => {
     return {
         type: ADD_POST,
         post
     }
 }

 export const deletePost = (postID) => dispatch => {
     api.deletePost(postID).then(
         post => dispatch(receiveUpdatedPost(post))
     )
 }

export const editPost = (postID, post) => dispatch => {
    api.editPost(postID, post).then(
        post => dispatch(receiveUpdatedPost(post))
    )
}

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

export const receiveUpdatedPost = post => ({
    type: UPDATE_POST,
    post
})

//COMMENTS ACTIONS

export const addComment = (comment) => dispatch => {
    api.addComment(comment).then(
        comment => dispatch(commentAdded(comment))
    )
}

export const commentAdded = comment => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const fetchComments = postID => dispatch => {
    api.getComments(postID).then(
        comments => dispatch(receiveComments(comments))
    )
}

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export const updateComment = (commentID, newComment) => dispatch => {
    api.editComment(commentID, newComment).then(
        comment => dispatch(receiveUpdateComment(comment))
    )
}

export const deleteComment = (commentID) => dispatch => {
    api.deleteComment(commentID).then(
        comment => dispatch(receiveUpdateComment(comment))
    )
}

export const voteComment = (commentID, option) => dispatch => {
    api.voteComment(commentID, option).then(
        comment => dispatch(receiveUpdateComment(comment))
    )
}

export const receiveUpdateComment = comment => {
    return {
    type: UPDATE_COMMENT,
    comment}
}



