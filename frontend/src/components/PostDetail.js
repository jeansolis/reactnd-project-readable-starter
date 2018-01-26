import React, { Component } from 'react'

import moment from 'moment'

import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import PlusCircle from 'react-icons/lib/fa/plus-circle'

class PostDetail extends React.Component {
    
    render(){
        const post = this.props.post
        return (
            <div className="post-detail-post">
                {(post) ?
                <div>
                    <div className="post-detail-actions-container">
                        <EditIcon size={30} className="action-icon edit" /> Edit Post
                        <RemoveIcon size={30} className="action-icon delete" /> Delete Post
                    </div>
                    <h1>{post.title}</h1>
                    <div className="post-detail-body">{post.body}</div>
                    <div className="post-detail-author-date-container">
                        Created by <span className="post-detail-author">{post.author}</span> on
                        <span className="post-detail-date"> {moment(post.timestamp).format('YYYY-MM-DD HH:MM:SS')}</span>
                    </div>
                    <div className="post-detail-score">Post Score: 
                        <span className="post-detail-score-value">{post.voteScore}</span>
                        <ThumbsUpIcon size={25} className="action-icon up-vote" 
                            onClick={() => this.props.upVote(post.id)} />
                        <ThumbsDownIcon size={25} className="action-icon down-vote" 
                            onClick={() => this.props.downVote(post.id)} />
                    </div>
                </div>
                :
                <div>Post not found :-(</div>
                }
            </div>
        )
    }
}

export default PostDetail

