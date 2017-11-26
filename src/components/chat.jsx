'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        return (
            <div>
                <input id='msg' type='text'/>
                <button onClick={this.sendMessage}>Send</button>
                <ul>
                    {this.props.messageList.map((msg, index) => {
                        return <li key={ index }>{msg.userName}: {msg.text} {msg.sameUp ? 'U' : ''}{msg.sameDown ? 'D' : ''}   {msg.isPending ? 'P' : ''}</li>;
                    })}
                </ul>

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
