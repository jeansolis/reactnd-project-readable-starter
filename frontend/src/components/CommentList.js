import React, { Component } from 'react'

import moment from 'moment'

class CommentList extends React.Component {
    
    render(){
        const comments = this.props.comments
        return (
            <div className="post-detail-comments-container">
            {(comments) ?                      
                <h2>Comments ({comments.length})</h2>
                :
                <div>No comments yet for this post, be the first to comment!</div>
            }
            </div>
        )
    }

}

export default CommentList

