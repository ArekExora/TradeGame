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
    }

    sendMessage () {
        const text = document.getElementById('msg').value;
        document.getElementById('msg').value = '';

        this.props.dispatch({ type: 'sendMessage', text });
    };

    render () {
        const detectEnter = (event) => {
            const ENTER_CODE = 13;

            if (event.charCode === ENTER_CODE) {
                this.sendMessage();
            }
        };

        return (
            <div>
                <input id='msg' type='text' onKeyPress={detectEnter}/>
                <button onClick={this.sendMessage}>Send</button>
                <MessageContainer messageList={this.props.messageList}/>

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
