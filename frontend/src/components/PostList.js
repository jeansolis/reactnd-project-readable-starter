import React, {Component} from 'react'
import * as api from '../utils/api'
import { capitalize } from '../utils/helper'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
//import { addPost, fetchPosts } from '../actions'

class PostList extends Component {
    
    static propTypes = {

    }

    state = {
        // posts: [],
        // category: 'all'
    }

    componentDidMount(){
        // (this.props.category && this.props.category !== 'all') ?
        // api.getPostsByCategory(this.props.category).then((posts)=>{
        //     this.props.fetchPosts(posts)
        // }) :
        // api.getAllPosts().then((posts)=>{
        //     this.props.fetchPosts(posts)
        // })
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps ? nextProps.category : 'no next props')
        //console.log(this.props.category)
        // if (nextProps && nextProps.category !== this.props.category){
        //     (nextProps.category !== 'all') ?
        //     api.getPostsByCategory(nextProps.category).then((posts)=>{
        //         this.props.fetchPosts(posts)
        //     }) :
        //     api.getAllPosts().then((posts)=>{
        //         this.props.fetchPosts(posts)
        //     })
        // }
    }

    render(){
        //console.log('rendering post list', this.props.category)
        return (
        /* Post List */
        <div className="post-list-section">
            <h2>{capitalize(this.props.category)} Posts</h2>
            <table className="post-list-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.posts.map((post) => (
                    <tr key={post.id}>
                        <td><Link to="#">{post.title}</Link></td>
                        <td>{post.timestamp}</td>
                        <td>{post.voteScore}</td>
                    </tr>
                ))}
                </tbody>
            </table>
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