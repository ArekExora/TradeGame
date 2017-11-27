'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import MessageItem from './messageItem.jsx';

const style = {
    backgroundColor: 'red',
    width: '400px'
};

const MessageContainer = ({ messageList }) => (
    <div className='chatContainer' style={style}>
        {messageList.map((message, index) => {
            return <MessageItem key={ index } message={message} index={index}/>;
        })}
    </div>
);

MessageContainer.propTypes = {
    messageList: PropTypes.array.isRequired
};

export default MessageContainer;
