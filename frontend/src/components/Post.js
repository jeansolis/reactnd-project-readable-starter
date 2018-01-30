import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuidv4 from 'uuid'
import { capitalize } from '../utils/helper'
import PropTypes from 'prop-types'

import { addPost, editPost } from '../actions'

export const MODE_ADD = 'ADD'
export const MODE_EDIT = 'EDIT'

class Post extends Component {

    static propTypes = {
        mode: PropTypes.string.isRequired,
        post: PropTypes.object,
        category: PropTypes.string.isRequired,
        categories: PropTypes.array.isRequired,
        addPost: PropTypes.func.isRequired,
        editPost: PropTypes.func.isRequired
    }

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
        const {mode, categories, post, category} = this.props
        return(
            <div className="post-form">
              <h2>{mode===MODE_ADD ?
                  <span> Add</span>
                  :
                  <span> Edit</span>
                  } Post 
            </h2>
              <form onSubmit={this.handleSubmit} >
                  <select name="category" defaultValue={mode===MODE_EDIT ? post.category : category } 
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
                  <input type="text" placeholder="Type your title..." name="title" 
                  defaultValue={mode===MODE_EDIT ? post.title : '' } required />
                  <textarea placeholder="Type your thoughts..." name="body"
                  defaultValue={mode===MODE_EDIT ? post.body : '' } required className="post-body"></textarea>                  
                  <input type="text" placeholder="Type your name..." name="author" 
                  defaultValue={mode===MODE_EDIT ? post.author : '' }
                  disabled={mode===MODE_EDIT} required/>
                  <div className="add-post-modal-buttons">
                  <button type="submit" className="button-add" >
                    {mode===MODE_ADD ?
                        <span> Add</span>
                    :
                        <span> Edit</span>
                    } Post</button>
                  <button type="button" onClick={this.props.closePostModal}
                  className="button-cancel">Cancel</button>
                </div>
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