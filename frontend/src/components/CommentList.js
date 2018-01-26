import React, { Component } from 'react'
import { voteComment } from '../actions'
import { connect } from 'react-redux'
import moment from 'moment'
import Modal from 'react-modal'

import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'
import PlusCircle from 'react-icons/lib/fa/plus-circle'

class CommentList extends React.Component {

    state = {
        addCommentModalOpen: true
    }

    componentDidMount(){
    }

    upVoteComment = (commentID) => {
        this.props.voteComment(commentID, 'upVote')
      }
    
    downVoteComment = (commentID) => {
        this.props.voteComment(commentID, 'downVote')
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
                    <PlusCircle size={30} className="action-icon add" onClick={() => this.setState({addCommentModalOpen: true})}/> 
                        Add a new comment
                    <ul className="comments-list">
                        {comments.map((comment) => (
                            <li key={comment.id}>
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
                        )}
                    </ul>
                </div>
                :
                <div>
                    <div>No comments yet for this post, be the first to comment!</div>
                    <PlusCircle size={30} className="action-icon add"/> Add a new comment
                </div>
            }

            <Modal className="modal"
                overlayClassName="overlay"
                isOpen={this.state.addCommentModalOpen}
                onRequestClose={this.closeAddCommentModal}
                contentLabel="Modal"
                ariaHideApp={false}
                >
                <div>
                    <h2>Add a new comment </h2>
                    <input type="text" placeholder="Type your name..." />
                    <br />
                    <textarea placeholder="Type your comment..." ></textarea>
                    <br/><br/>
                    <button onClick={this.addComment}>Add Comment</button>
                    <button onClick={this.closeCommentModal}>Cancel</button>
                </div>
            </Modal>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)