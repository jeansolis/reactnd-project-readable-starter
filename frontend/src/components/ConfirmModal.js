import React, { Component } from 'react'
import Modal from 'react-modal'

class ConfirmModal extends Component {

    render(){
        const {message, yesHandler, noHandler} = this.props
        return (
            <div className="">
                <span className="confirm-modal-message">{message}</span>
                <br /><br />
                <div className="confirm-modal-buttons">
                <input type="button" value="Yes" onClick={() => yesHandler()} 
                className="button-confirm-yes" />
                <input type="button" value="No" onClick={() => noHandler()}
                className="button-confirm-no" />
                </div>
            </div>
        )
    }
}

export default ConfirmModal