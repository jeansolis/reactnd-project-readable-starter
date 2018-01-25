import React, {Component} from 'react'
import PostDetail from './PostDetail'
import CommentList from './CommentList'

import {connect} from 'react-redux'
import { fetchPost, fetchComments } from '../actions'

import ArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'

class PostDetailContainer extends React.Component {

    componentDidMount() {
        if (this.props.match.params.postID){
            //Fetch post and comments
            this.props.getPost(this.props.match.params.postID)
        }
    }

    render() {
        //console.log(this.props)
        const {post, comments, history} = this.props
        return (
             <div className="post-detail-container">
                 {/*TODO: Add a Link to go to /category/ instead of the previous page */}
                 <ArrowCircleLeft size={30} onClick={() => history.goBack()} 
                     className="action-icon go-back" />
                     Return to posts

                <PostDetail post={post} upVote={this.props.upVotePost} 
                    downVote={this.props.downVotePost} /> 
            
                <CommentList comments={comments} />
             </div>                                                                          
        )
     }
}

function mapStateToProps(state, ownProps){
    const postID = ownProps.match.params.postID || '' 
    return {
        post: state.posts[ownProps.match.params.postID],
        comments: (state.comments[postID]) ? 
            Object.keys(state.comments[postID]).map((key) => state.comments[postID][key]) 
            : {} 
    }
}

function mapDispatchToProps(dispatch){
    return {
        getPost: (postID) => dispatch(fetchPost(postID)),
        getComments: (postID) => dispatch(fetchComments(postID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer)