import React, {Component} from 'react'
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { fetchAllPosts, fetchPostsByCategory} from '../actions'
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

             //Reset sorting
             this.setState({
                sortColumn: '',
                sortOrder: ''
             })
        }
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
        return (
            <PostList 
            category={this.props.category} 
            upVote={this.props.upVote}
            downVote={this.props.downVote}
            sortByColumn={this.orderByColumn}
            sortColumn={this.state.sortColumn} 
            sortOrder={this.state.sortOrder} />
        ) 
    }
}


function mapStateToProps({posts}, state){
    return {
        // posts: Object.keys(posts).map((key) => posts[key])
    }
  }
  
  function mapDispatchToProps(dispatch){
    return {
        fetchAllPosts: (posts) => dispatch(fetchAllPosts(posts)),
        fetchPostsByCategory: (posts) => dispatch(fetchPostsByCategory(posts))
    }
  }

//export default PostListContainer
export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);