import React, {Component} from 'react'
import * as api from '../utils/api'
import { capitalize } from '../utils/helper'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import moment from 'moment'

import EditIcon from 'react-icons/lib/fa/edit'
import RemoveIcon from 'react-icons/lib/fa/trash'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import AngleUpIcon from 'react-icons/lib/fa/angle-up'
import AngleDownIcon from 'react-icons/lib/fa/angle-down'

//import { addPost, fetchPosts } from '../actions'

class PostList extends Component {
    
    static propTypes = {

    }

    state = {
        // posts: [],
        // category: 'all'
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
                {   console.log(this.props)}
                    {this.props.posts.map((post) => (
                    <tr key={post.id}>
                        <td><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></td>
                        <td>{post.author}</td>
                        <td>{post.commentCount}</td>
                        <td>{moment(post.timestamp).format('YYYY-MM-DD HH:MM:SS')}</td>
                        <td>{post.voteScore}</td>
                        <td>
                            <EditIcon size={30} title="Edit Post" className="action-icon" />
                            <RemoveIcon size={30} alt="Delete Post" className="action-icon" />
                            <ThumbsUpIcon size={30} alt="Up Vote Post" onClick={() => this.props.upVote(post.id)} className="action-icon"/>
                            <ThumbsDownIcon size={30} alt="Down Vote Post" onClick={() => this.props.downVote(post.id)} className="action-icon"/>
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

function mapStateToProps({posts}, ownProps){
    let postList = Object.keys(posts).map((key) => posts[key])
    if (ownProps.sortColumn !== '') {
        postList.sort(sortBy(ownProps.sortOrder + ownProps.sortColumn))
    }
    return {
        posts: postList
    }
  }
  
//export default PostList
export default connect(mapStateToProps)(PostList);