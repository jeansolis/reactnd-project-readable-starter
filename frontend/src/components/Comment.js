import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { voteComment } from '../actions'
import moment from 'moment'

import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'

class Comment extends React.Component {

    upVoteComment = (commentID) => {
        this.props.voteComment(commentID, 'upVote')
      }
    
    downVoteComment = (commentID) => {
        this.props.voteComment(commentID, 'downVote')
    }

    render(){
        const {comment} = this.props
        return(
            <li>
                <div className="post-comment-body">
                    {comment.body}
                </div>
                <div className="post-comment-author-date-container">
                    Commented by <span className="post-comment-author">{comment.author}</span> on
                <span className="post-comment-date"> {moment(comment.timestamp).format('YYYY-MM-DD HH:MM:SS')}</span>
                </div>
                <div className="post-comment-score">Comment Score: 
                <span className="post-comment-score-value">{comment.voteScore}</span>
                <ThumbsUpIcon size={20} className="action-icon up-vote" 
                    onClick={() => this.upVoteComment(comment.id)} />
                <ThumbsDownIcon size={20} className="action-icon down-vote" 
                    onClick={() => this.downVoteComment(comment.id)} />
                </div>
                <div className="post-comment-actions">
                    <EditIcon size={20} className="action-icon edit" /> Edit Comment
                    <RemoveIcon size={20} className="action-icon delete" /> Delete Comment
                </div>
            </li>
        )
    }
}

function mapStateToProps(){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return {
        voteComment: (commentID, option) => dispatch(voteComment(commentID, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)