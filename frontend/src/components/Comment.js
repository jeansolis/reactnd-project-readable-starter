import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { voteComment, updateComment, deleteComment } from '../actions'
import moment from 'moment'
import Modal from 'react-modal'
import ConfirmModal from './ConfirmModal'

import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'
import SaveIcon from 'react-icons/lib/fa/floppy-o'
import CancelIcon from 'react-icons/lib/fa/ban'

const MODE_VIEW = 'VIEW'
const MODE_EDIT = 'EDIT'

class Comment extends React.Component {

    state = {
        mode: MODE_VIEW,
        confirmModalOpen: false
    }

    upVoteComment = (commentID) => {
        this.props.voteComment(commentID, 'upVote')
      }
    
    downVoteComment = (commentID) => {
        this.props.voteComment(commentID, 'downVote')
    }

    deleteComment = () => {
        //TODO: Ask for confirmation first.
        const {comment} = this.props
        this.props.deleteComment(comment.id)
    }

    editComment = () => {
        this.setState({
            mode: MODE_EDIT
        })
    }

    cancelEdit = () =>{
        this.setState({
            mode: MODE_VIEW
        })
    }

    updateComment = (e) => {
        const {comment} = this.props
        let newComment = {}

        //Update fields
        newComment.body = this.body.value
        newComment.timestamp = Date.now()
        
        this.props.editComment(comment.id, newComment)

        this.setState({
            mode: MODE_VIEW
        })
    }

    openConfirmModal = () => {
        this.setState({
            confirmModalOpen: true,
        })
    }

    closeConfirmModal = () => {
        this.setState({
            confirmModalOpen: false
        })
    }

    render(){
        const {comment} = this.props
        return(
            <li>
                <div className="post-comment-body">

                    {this.state.mode === MODE_VIEW ? 
                        comment.body
                    :
                    <textarea placeholder="Type your comment..." name="body" 
                        defaultValue={comment.body} ref={(input) => this.body = input} 
                        className="comment-body">
                    </textarea>
                    }
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
                    {this.state.mode === MODE_VIEW ? 
                    <span>
                        <EditIcon size={20} className="action-icon edit" onClick={this.editComment} />Edit Comment
                        <RemoveIcon size={20} className="action-icon delete" onClick={this.openConfirmModal} /> Delete Comment
                    </span>
                    :
                    <span>
                        <SaveIcon size={20} className="action-icon save" onClick={this.updateComment} />Update Comment
                        <CancelIcon size={20} className="action-icon cancel" onClick={this.cancelEdit} />Cancel Update
                    </span>
                    }
                </div>

                <Modal className="confirm-modal"
                    overlayClassName="overlay"
                    isOpen={this.state.confirmModalOpen}
                    contentLabel="Modal"
                    ariaHideApp={false}
                    >
                    <ConfirmModal message="Do you really want to delete this comment?" 
                    yesHandler={this.deleteComment} 
                    noHandler={this.closeConfirmModal}/>
                </Modal>
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
        voteComment: (commentID, option) => dispatch(voteComment(commentID, option)),
        editComment: (commentID, comment) => dispatch(updateComment(commentID, comment)),
        deleteComment: (commentID) => dispatch(deleteComment(commentID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)