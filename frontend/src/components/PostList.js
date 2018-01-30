import React, {Component} from 'react'
import { capitalize } from '../utils/helper'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import sortBy from 'sort-by'
import moment from 'moment'
import Post, {MODE_ADD, MODE_EDIT} from './Post'
import { deletePost } from '../actions'
import ConfirmModal from './ConfirmModal'

import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import AngleUpIcon from 'react-icons/lib/fa/angle-up'
import AngleDownIcon from 'react-icons/lib/fa/angle-down'
import PlusCircle from 'react-icons/lib/fa/plus-circle'

class PostList extends Component {
    
    static propTypes = {

    }

    state = {
        addPostModalOpen: false,
        modalMode: MODE_ADD,
        selectedPost: null,
        confirmModalOpen: false
    }

    openPostModal = (mode, post) => {
        this.setState({
            modalMode: mode,
            addPostModalOpen: true,
            selectedPost: post
        })
    }

    closePostModal = () => {
        this.setState({
            addPostModalOpen: false
        })
    }

    openConfirmModal = (post) => {
        this.setState({
            confirmModalOpen: true,
            selectedPost: post
        })
    }

    closeConfirmModal = () => {
        this.setState({
            confirmModalOpen: false
        })
    }

    deletePost = (postID) => {
        //TODO: Ask for confirmation
        this.props.deletePost(postID)
        this.closeConfirmModal()
    }

    render(){
        const columns = [{label: 'title', source: 'title'},
                        {label: 'author', source: 'author'},
                        {label: 'comments', source: 'commentCount'},
                        {label: 'date', source: 'timestamp'},
                        {label: 'score', source: 'voteScore'}];
        
        return (
        /* Post List */
        <div className="post-list-section">
            <h2>{capitalize(this.props.category)} Posts</h2>

            {(this.props.posts.length > 0)?
                <table className="post-list-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.source} className="post-list-column-header"
                            onClick={() => this.props.sortByColumn(column.source)}>
                                {capitalize(column.label)}
                                {this.props.sortColumn === column.source ?
                                this.props.sortOrder === '' ?  
                                <AngleUpIcon size={25}/> : <AngleDownIcon size={25}/> :
                                ''}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.posts.map((post) => (
                    <tr key={post.id}>
                        <td><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></td>
                        <td>{post.author}</td>
                        <td>{post.commentCount}</td>
                        <td>{moment(post.timestamp).format('YYYY-MM-DD HH:MM:SS')}</td>
                        <td>{post.voteScore}</td>
                        <td>
                            <EditIcon size={30} className="action-icon edit" 
                                onClick={() => this.openPostModal(MODE_EDIT, post)} />
                            <RemoveIcon size={30} className="action-icon delete" 
                                onClick={() => this.openConfirmModal(post) }/>
                            <ThumbsUpIcon size={30} className="action-icon up-vote" 
                                onClick={() => this.props.upVote(post.id)} />
                            <ThumbsDownIcon size={30} className="action-icon down-vote" 
                                onClick={() => this.props.downVote(post.id)} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            :
            <span>Category is empty</span>
             } 
             <PlusCircle size={40} className="action-icon add" onClick={() => this.openPostModal(MODE_ADD)}/>

            <Modal className="add-post-modal"
            overlayClassName="overlay"
            isOpen={this.state.addPostModalOpen}
            contentLabel="Modal"
            ariaHideApp={false}
            >
                <Post mode={this.state.modalMode} closePostModal={this.closePostModal} 
                post={this.state.selectedPost}/>
            </Modal>
            
            <Modal className="confirm-modal"
             overlayClassName="overlay"
             isOpen={this.state.confirmModalOpen}
             contentLabel="Modal"
             ariaHideApp={false}
             >
                <ConfirmModal message="Do you really want to delete this post?" 
                yesHandler={() => this.deletePost(this.state.selectedPost.id)} 
                noHandler={this.closeConfirmModal}/>
             </Modal>

        </div>
        )
    }
}

function mapStateToProps({posts}, ownProps){
    let postList = Object.keys(posts).map((key) => posts[key]).filter((post) => !post.deleted)
    if (ownProps.sortColumn !== '') {
        postList.sort(sortBy(ownProps.sortOrder + ownProps.sortColumn))
    }
    return {
        posts: postList
    }
  }

function mapDispatchToProps(dispatch){
    return {
        deletePost: (postID) => dispatch(deletePost(postID))
    }
}
  
//export default PostList
export default connect(mapStateToProps, mapDispatchToProps)(PostList);