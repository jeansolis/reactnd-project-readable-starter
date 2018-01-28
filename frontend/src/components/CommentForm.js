import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { addComment } from '../actions'
import uuidv4 from 'uuid'

class CommentForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const comment = serializeForm(e.target, {hash: true})
        //Add additional required fields
        comment.id = uuidv4()
        comment.timestamp = Date.now()
        comment.parentId = this.props.post.id
        
        this.props.addComment(comment)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Type your name..." name="author" />
                <br />
                <textarea placeholder="Type your comment..." name="body"></textarea>
                <br/><br/>
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