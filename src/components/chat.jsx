'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import socket from './../services/socket';

class Chat extends React.Component {
    constructor(props, context) {
        super(props, context);

        socket.on('chat', (msg) => {
            console.log('New message', msg);
            this.props.dispatch({ type: 'receivedMessage', msg });
        });
    }

    render () {
        const sendMessage = () => {
            const text = document.getElementById('msg').value;
            document.getElementById('msg').value = '';

            console.log('Enviamos un chat: ' + text);
            socket.emit('chat', {from: this.props.name, text});
        };

        return (
            <div>
                <input id='msg' type='text'/>
                <button onClick={sendMessage}>Send</button>
                <ul>
                    {this.props.messageList.map((msg, index) => {
                        return <li key={ index }>{msg.from}: {msg.text}</li>;
                    })}
                </ul>

            </div>
        );
    }
}

Chat.propTypes = {
    name: PropTypes.string.isRequired,
    messageList: PropTypes.array.isRequired
};

export default connect(state => ({
    messageList: state.chat
}))(Chat);
