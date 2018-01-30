import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import Comment from './Comment'

class CommentList extends Component {

    state = {
        addCommentModalOpen: false
    }

    componentDidMount(){
    }

    addComment = () => {
        this.closeCommentModal()
    }

    closeCommentModal = () => {
        this.setState({addCommentModalOpen: false})
    }

    onCloseCommentModal(){
        
    }

    render(){
        const comments = this.props.comments
        return (
            <div className="post-detail-comments-container">
            {(comments.length > 0) ?                      
                <div>
                    <h2>Comments ({comments.length}) </h2>
                    <CommentForm post={this.props.post} />
                    <ul className="comments-list">
                        {comments.map((comment) => (
                            <Comment comment={comment} key={comment.id} />
                        )
                        )}
                    </ul>
                </div>
                :
                <div>
                    <div className="no-comments-label">No comments yet for this post, be the first to comment!</div>
                    <CommentForm post={this.props.post} />
                </div>
            }

            </div>
        )
    }

}

export default connect()(CommentList)