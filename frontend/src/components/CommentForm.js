import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { addComment } from '../actions'
import uuidv4 from 'uuid'

class CommentForm extends Component {

    state = {
        author: '',
        body: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const comment = serializeForm(e.target, {hash: true})

        //validate data
        if(comment.author && comment.author.length > 0 &&
        comment.body && comment.body.length > 0) {
            //Add additional required fields
            comment.id = uuidv4()
            comment.timestamp = Date.now()
            comment.parentId = this.props.post.id

            this.props.addComment(comment)

            //Clean data 
            this.setState({
                author: '',
                body: ''
            })
        }
    }

    render(){
        const {author, body} = this.state
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Type your name..." name="author" 
                value={author} onChange={(e) => {
                    this.setState({
                        author: e.target.value
                    })
                }} required/>
                <textarea placeholder="Type your comment..." name="body"
                value={body} onChange={(e) => {
                    this.setState({
                        body: e.target.value
                    })
                }} required className="comment-body"></textarea>
                <button type="submit">Add Comment</button>
                {/* <PlusCircle size={30} className="action-icon add" onClick={() => this.setState({addCommentModalOpen: true})}/> 
                Add a new comment */}
            </form>
        )
    }
}

function mapStateToProps(){
    return {
    }
}

function mapDispatchToProps(dispatch){
    return {
        addComment: (comment) => dispatch(addComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)