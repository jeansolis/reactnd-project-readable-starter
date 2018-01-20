import React, {Component} from 'react'
import * as api from '../utils/api'
import { capitalize } from '../utils/helper'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'

//import { addPost, fetchPosts } from '../actions'

class PostList extends Component {
    
    static propTypes = {

    }

    state = {
        // posts: [],
        // category: 'all'
    }

    render(){
        //console.log('rendering post list', this.props.category)
        return (
        /* Post List */
        <div className="post-list-section">
            <h2>{capitalize(this.props.category)} Posts</h2>
            {(this.props.posts.length > 0)?
                <table className="post-list-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Comments</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.posts.map((post) => (
                    <tr key={post.id}>
                        <td><Link to="#">{post.title}</Link></td>
                        <td>{post.author}</td>
                        <td>{post.commentCount}</td>
                        <td>{post.timestamp}</td>
                        <td>{post.voteScore}</td>
                        <td>
                            <EditIcon size={30} title="Edit Post" className="action-icon" />
                            <RemoveIcon size={30} alt="Delete Post" className="action-icon" />
                            <ThumbsUpIcon size={30} alt="Up Vote Post" onClick={() => this.props.upVote(post.id)} className="action-icon"/>
                            <ThumbsDownIcon size={30} alt="Down Vote Post" onClick={() =>this.props.downVote(post.id)} className="action-icon"/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            :
            <span>Category is empty</span>
             } 
        </div>
        )
    }
}

// function mapStateToProps({posts}){
//     return {
//         posts: Object.keys(posts).map((key) => posts[key])
//     }
//   }
  
//   function mapDispatchToProps(dispatch){
//     return {
//         //addPost: (post) => dispatch(addPost(post)),
//         //fetchPosts: (posts) => dispatch(fetchPosts(posts))
//     }
//   }

export default PostList
//export default connect(mapStateToProps, mapDispatchToProps)(PostList);