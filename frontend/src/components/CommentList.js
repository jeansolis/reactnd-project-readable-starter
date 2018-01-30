import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import Comment from './Comment'

class CommentList extends Component {

    state = {
        addCommentModalOpen: false,
    }

    addComment = () => {
        this.closeCommentModal()
    }

    closeCommentModal = () => {
        this.setState({addCommentModalOpen: false})
    }

    render(){
        const {comments, post} = this.props
        return (
            <div className="post-detail-comments-container">
            {comments && comments.length > 0 ?                      
                <div>
                    <h2>Comments ({comments.length}) </h2>
                    <CommentForm post={this.props.post} />
                    <ul className="comments-list">
                        {comments.map((comment) => (
                            <Comment comment={comment} key={comment.id}/>
                        )
                        )}
                    </ul>
                </div>
            :
                <div>
                    {post ?
                    <span><div className="no-comments-label">No comments yet for this post, be the first to comment!</div>
                    <CommentForm post={this.props.post} /></span>
                    :
                    <span></span>
                    }
                </div>
            }
            </div>
        )
    }

}

export default connect()(CommentList)