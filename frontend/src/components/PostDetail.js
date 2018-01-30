import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Modal from 'react-modal'
import Post, {MODE_EDIT} from './Post'
import { deletePost } from '../actions'
import ConfirmModal from './ConfirmModal'
import PropTypes from 'prop-types'

import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'

class PostDetail extends Component {

    static propTypes = {
        post: PropTypes.object,
        history: PropTypes.object.isRequired,
        upVote: PropTypes.func.isRequired,
        downVote: PropTypes.func.isRequired
    }

    state = {
        addPostModalOpen: false,
        confirmModalOpen: false
    }

    openPostModal = () => {
        this.setState({
            addPostModalOpen: true
        })
    }

    closePostModal = () => {
        this.setState({
            addPostModalOpen: false
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

    deletePost = (postID) => {
        this.props.deletePost(postID)
        //Navigate to posts list
        this.props.history.push("/")
    }

    render(){
        const post = this.props.post
        return (
            <div className="post-detail-post">
                {(post) ?
                <div>
                    <div className="post-detail-actions-container">
                        <EditIcon size={30} className="action-icon edit" 
                        onClick={() => this.openPostModal()}
                        /> Edit Post
                        <RemoveIcon size={30} className="action-icon delete" 
                        onClick={() => {this.openConfirmModal()}}/> Delete Post
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

                <Modal className="add-post-modal"
                    overlayClassName="overlay"
                    isOpen={this.state.addPostModalOpen}
                    contentLabel="Modal"
                    ariaHideApp={false}
                    >
                        <Post mode={MODE_EDIT} closePostModal={this.closePostModal} 
                            post = {post} category={post.category} />
                 </Modal>

                 <Modal className="confirm-modal"
                    overlayClassName="overlay"
                    isOpen={this.state.confirmModalOpen}
                    contentLabel="Modal"
                    ariaHideApp={false}
                    >
                    <ConfirmModal message="Do you really want to delete this post?" 
                    yesHandler={() => this.deletePost(post.id)} 
                    noHandler={this.closeConfirmModal}/>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
    }
}

function mapDispatchToProps(dispatch){
    return {
        deletePost: (postID) => dispatch(deletePost(postID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)

