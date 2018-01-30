import React, {Component} from 'react'
import PostDetail from './PostDetail'
import CommentList from './CommentList'
import { Link } from 'react-router-dom'
import { connect}  from 'react-redux'
import { fetchPost, fetchComments } from '../actions'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

import ArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'

class PostDetailContainer extends Component {

    static propTypes = {
        post: PropTypes.object,
        getPost: PropTypes.func.isRequired,
        getComments: PropTypes.func.isRequired
    }

    componentDidMount() {
        if (this.props.match.params.postID){
            //Fetch post and comments
            this.props.getPost(this.props.match.params.postID)
        }
    }

    render() {
        const {post, comments, history} = this.props
        return (
             <div className="post-detail-container">
                 {/*onClick={() => history.goBack()} */}
                 {/* <Link to={`/${this.props.match.params.category}`}> */}
                 <Link to="/">
                    <ArrowCircleLeft size={30} 
                     className="action-icon go-back" />
                     {/* Return to {capitalize(this.props.match.params.category)} posts */}
                     Return to All posts
                 </Link>

                <PostDetail post={post} upVote={this.props.upVote} 
                    downVote={this.props.downVote} history={history} /> 
            
                <CommentList comments={comments} post={post} />
             </div>                                                                          
        )
     }
}

function mapStateToProps(state, ownProps){
    const postID = ownProps.match.params.postID || '' 
    return {
        post: state.posts[ownProps.match.params.postID],
        comments: (state.comments[postID]) ? 
            Object.keys(state.comments[postID]).map((key) => state.comments[postID][key])
                .filter((comment) => !comment.deleted)
                .sort(sortBy('-timestamp'))
            : {} 
    }
}

function mapDispatchToProps(dispatch){
    return {
        getPost: (postID) => dispatch(fetchPost(postID)),
        getComments: (postID) => dispatch(fetchComments(postID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer)