import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import * as api from '../utils/api'
import CategoryList from './CategoryList'
import PostList from './PostList'
import { connect } from 'react-redux'

import { fetchCategories, addPost } from '../actions'

import '../App.css';

 
class App extends Component {

  static propTypes = {
    
  }

  state = {
    categories: []
  }

  componentDidMount(){

    //Load categories from server
    api.getCategories().then((categories)=>{

        this.props.fetchCategories(categories)
    })

  }

  render() {
    //console.log(this.props)
    return (
      <main className="app-container">
        
        {/*Route for Default Root */}
        <Route exact path="/" render={(props) => (
          <div>
            <CategoryList category="all" />
            <PostList category="all" />
          </div>
        )} />

        {/*Route for Category View */}
        <Route path="/:category" render={(props) => (
          <div>      
            <CategoryList category={props.match.params.category} />
            <PostList category={props.match.params.category}/>
          </div>
        )} />
        
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
    addPost: (post) => dispatch(addPost(post))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//export default connect(mapStateToProps, mapDispatchToProps)(App)
//export default App;
