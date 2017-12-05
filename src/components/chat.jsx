'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MessageContainer from './chatComponents/messageContainer';
import socket from './../services/socket';

class Chat extends React.Component {
    constructor(props, context) {
        super(props, context);

        socket.on('chat', (msg) => {
            this.props.dispatch({ type: 'receiveMessage', msg });
        });

        this.sendMessage = this.sendMessage.bind(this);
        this.detectEnter = this.detectEnter.bind(this);
    }

    detectEnter (event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    };

    sendMessage () {
        const text = document.getElementById('msg').value;
        document.getElementById('msg').value = '';

        if(text.trim() !== '') {
            this.props.dispatch({ type: 'sendMessage', text });
        }
    };

    componentDidUpdate(prevProps) {
        if(prevProps.messageList.length === this.props.messageList.length) {
            return;
        }
        this.messageBoard.scrollTop = this.messageBoard.scrollHeight - this.messageBoard.clientHeight;
    }

    render () {
        return (
            <div ref={(chatElement) => { this.messageBoard = chatElement && chatElement.getElementsByClassName('chat__message-board')[0]; }} className='chat__container'>
                <div className='chat__header'>Trade Game Chat</div>
                <MessageContainer messageList={this.props.messageList}/>
                <div className='chat__footer'>
                    <input className='chat__input' id='msg' type='text' placeholder='Type here...' onKeyPress={this.detectEnter}/>
                    <button className='chat__button' onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    messageList: PropTypes.array.isRequired
};

export default connect(state => ({
    messageList: state.chat
}))(Chat);
