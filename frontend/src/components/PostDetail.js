import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import { fetchPost, fetchComments } from '../actions'

import { Link } from 'react-router-dom'

import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import PlusCircle from 'react-icons/lib/fa/plus-circle'
import ArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'

class PostDetail extends React.Component {

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
                {(post) ?
                    <div>
                        <div className="post-detail-actions-container">
                            <EditIcon size={30} className="action-icon edit" /> Edit Post
                            <RemoveIcon size={30} className="action-icon delete" /> Delete Post
                        </div>
                        <h1>{this.props.post.title}</h1>
                        <div className="post-detail-body">{post.body}</div>
                        <div className="post-detail-author-date-container">
                            Created by <span className="post-detail-author">{post.author}</span> on
                            <span className="post-detail-date"> {moment(post.timestamp).format('YYYY-MM-DD HH:MM:SS')}</span>
                        </div>
                        <div className="post-detail-score">Current Score: 
                            <span className="post-detail-score-value">{post.voteScore}</span>
                            <ThumbsUpIcon size={25} className="action-icon up-vote" 
                                onClick={() => this.props.upVote(post.id)} />
                            <ThumbsDownIcon size={25} className="action-icon down-vote" 
                                onClick={() => this.props.downVote(post.id)} />
                        </div>
                    </div> :
                    <div>Post not found :-(</div>
                }
                <div className="post-detail-comments-container">
                {(comments) ?                      
                    <h2>Comments ({comments.length})</h2>
                    :
                    <div>No comments yet for this post, be the first to comment!</div>
                }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)