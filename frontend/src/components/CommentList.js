import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import CommentForm from './CommentForm'
import Comment from './Comment'

import PlusCircle from 'react-icons/lib/fa/plus-circle'

class CommentList extends React.Component {

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
        console.log(comments)
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
                    <div>No comments yet for this post, be the first to comment!</div>
                    <CommentForm post={this.props.post} />
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
                    <form onSubmit={this.handleSubmit} >
                        <input type="text" placeholder="Type your name..." name="author" />
                        <br />
                        <textarea placeholder="Type your comment..." name="comment"></textarea>
                        <br/><br/>
                        <button type="submit" onClick={this.addComment}>Add Comment</button>
                        <button type="button" onClick={this.closeCommentModal}>Cancel</button>
                    </form>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)