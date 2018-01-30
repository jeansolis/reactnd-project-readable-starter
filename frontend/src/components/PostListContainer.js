import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts, fetchPostsByCategory} from '../actions'
import PostList from './PostList'
import PropTypes from 'prop-types'

class PostListContainer extends Component {
    
    static propTypes = {
        category: PropTypes.string.isRequired,
        upVote: PropTypes.func.isRequired,
        downVote: PropTypes.func.isRequired,
        fetchAllPosts: PropTypes.func.isRequired,
        fetchPostsByCategory: PropTypes.func.isRequired
    }

    state = {
        sortColumn: 'timestamp',
        sortOrder: '-'
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
    }
  }
  
  function mapDispatchToProps(dispatch){
    return {
        fetchAllPosts: (posts) => dispatch(fetchAllPosts(posts)),
        fetchPostsByCategory: (posts) => dispatch(fetchPostsByCategory(posts))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);