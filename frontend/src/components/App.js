import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import * as api from '../utils/api'
import { connect } from 'react-redux'

import CategoryList from './CategoryList'
import PostListContainer from './PostListContainer'
import PostDetail from './PostDetail'

import { fetchCategories, upVotePost, downVotePost } from '../actions'

import '../App.css';

class App extends Component {

  static propTypes = {
    
  }

  state = {
    categories: []
  }

  componentDidMount(){

    this.props.fetchCategories()

  }

  upVotePost = (postID) => {
    this.props.upVote(postID, 'upVote')
  }

  downVotePost = (postID) => {
    this.props.downVote(postID, 'downVote')
  }

  render() {
    //console.log(this.props)
    return (
      <main className="app-container">
        
        {/*Route for Default Root */}
        <Route exact path="/" render={(props) => (
          <div>
            <CategoryList category="all" />
            <PostListContainer category="all" upVote={this.upVotePost}
               downVote={this.downVotePost} />
          </div>
        )} />

        {/*Route for Category View */}
        <Route exact path="/:category" render={(props) => (
          <div>      
            <CategoryList category={props.match.params.category} />
            <PostListContainer category={props.match.params.category} 
              upVote={this.upVotePost} downVote={this.downVotePost}/>
          </div>
        )} />

        <Route exact path="/:category/:postID" render={(props) => (
            <PostDetail {...props} upVote={this.upVotePost} downVote={this.downVotePost} />
        )}/>

      </main>
    );
  }

}

function mapStateToProps(posts){
  return {
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchCategories: (categories) => dispatch(fetchCategories(categories)),
    upVote: (id, option) => dispatch(upVotePost(id, option)),
    downVote: (id, option) => dispatch(downVotePost(id, option))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//export default connect(mapStateToProps, mapDispatchToProps)(App)
//export default App;
