import React, {Component} from 'react'
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { fetchAllPosts, 
    fetchPostsByCategory, 
    upVotePost, 
    downVotePost, 
    addPost } from '../actions'
import PostList from './PostList'

class PostListContainer extends Component {
    
    static propTypes = {

    }

    state = {
        sortColumn: '',
        sortOrder: ''
    }

    componentDidMount() {
        (this.props.category && this.props.category !== 'all') ?
            this.props.fetchPostsByCategory(this.props.category) :
            this.props.fetchAllPosts();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.category !== this.props.category){
             (nextProps.category !== 'all') ?
             this.props.fetchPostsByCategory(nextProps.category) :
             this.props.fetchAllPosts();

             this.setState({
                sortColumn: '',
                sortOrder: ''
             })
        }
    }

    upVotePost = (postID) => {
        this.props.upVote(postID, 'upVote')
    }

    downVotePost = (postID) => {
        this.props.downVote(postID, 'downVote')
    }

    orderByColumn = (column) => {
        //Update local state
        this.setState((prevState) => ({
            sortColumn: column,
            sortOrder: (prevState.sortColumn !== column) ? 
            ''
            : 
            (prevState.sortOrder === '') ? '-' : '' 
        }))
    }

    render() {
        console.log(this.state)
        return (
            <PostList 
            category={this.props.category} 
            upVote={this.upVotePost}
            downVote={this.downVotePost}
            sortByColumn={this.orderByColumn}
            sortColumn={this.state.sortColumn} 
            sortOrder={this.state.sortOrder} />
        ) 
    }
}


function mapStateToProps({posts}, state){
    console.log('state', state)
    return {
        // posts: Object.keys(posts).map((key) => posts[key])
    }
  }
  
  function mapDispatchToProps(dispatch){
    return {
        addPost: (post) => dispatch(addPost(post)),
        fetchAllPosts: (posts) => dispatch(fetchAllPosts(posts)),
        fetchPostsByCategory: (posts) => dispatch(fetchPostsByCategory(posts)),
        upVote: (id, option) => dispatch(upVotePost(id, option)),
        downVote: (id, option) => dispatch(downVotePost(id, option))
    }
  }

//export default PostListContainer
export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);