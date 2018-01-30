import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuidv4 from 'uuid'
import { capitalize } from '../utils/helper'

import { addPost, editPost } from '../actions'

export const MODE_ADD = 'ADD'
export const MODE_EDIT = 'EDIT'

class Post extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const {mode, post} = this.props
        const newPost = serializeForm(e.target, {hash: true})

        if(mode === MODE_ADD){

            if(newPost.category && newPost.category.length > 0 &&
                newPost.title && newPost.title.length > 0 &&
                newPost.body && newPost.body.length > 0 &&
                newPost.author && newPost.author.length > 0) {

                newPost.id = uuidv4()
                newPost.timestamp = Date.now()
                    
                this.props.addPost(newPost)
            }
        }

        if(mode === MODE_EDIT){

            if(newPost.title && newPost.title.length > 0 &&
                newPost.body && newPost.body.length > 0 ){
                    
                let editPost = {}
                editPost.title = newPost.title
                editPost.body = newPost.body
                this.props.editPost(post.id, newPost)

            }            
        }

        this.props.closePostModal()    
    }    

    render(){
        const {mode, categories, post} = this.props
        return(
            <div className="post-form">
              <h2>{mode===MODE_ADD ?
                  <span> Add</span>
                  :
                  <span> Edit</span>
                  } Post 
            </h2>
              <form onSubmit={this.handleSubmit} >
                  <select name="category" defaultValue={mode===MODE_EDIT ? post.category : '' } 
                    disabled={mode===MODE_EDIT} required>
                      {mode===MODE_ADD ?
                        <option value="">Select a category....</option>
                        :
                        ""
                      }
                      {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                            {capitalize(category.name)}
                        </option>
                      ))}
                  </select>
                  <br />
                  <input type="text" placeholder="Type your title..." name="title" 
                  defaultValue={mode===MODE_EDIT ? post.title : '' } required />
                  <br />
                  <textarea placeholder="Type your thoughts..." name="body"
                  defaultValue={mode===MODE_EDIT ? post.body : '' } required></textarea>
                  <br />
                  <input type="text" placeholder="Type your name..." name="author" 
                  defaultValue={mode===MODE_EDIT ? post.author : '' }
                  disabled={mode===MODE_EDIT} required/>
                  <br/><br/>
                  <button type="submit" >
                    {mode===MODE_ADD ?
                        <span> Add</span>
                    :
                        <span> Edit</span>
                    } Post</button>
                  <button type="button" onClick={this.props.closePostModal}>Cancel</button>
              </form>
            </div>
        )
    }
}

function mapStateToProps({categories}){
    return {
        categories: Object.keys(categories).map((key) => 
            categories[key]
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        addPost: (post) => dispatch(addPost(post)),
        editPost: (postID, post) => dispatch(editPost(postID, post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)