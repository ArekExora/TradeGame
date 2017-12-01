'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import MessageItem from './messageItem.jsx';

const style = {
    backgroundImage: 'linear-gradient(to bottom, rgb(253, 248, 200) 0%,rgb(253, 238, 129) 100%)',
    width: '400px'
};

const MessageContainer = ({ messageList }) => (
    <div className='chat__message-board'>
        {messageList.map((message, index) => {
            return <MessageItem key={ index } message={message} index={index}/>;
        })}
    </div>
);

MessageContainer.propTypes = {
    messageList: PropTypes.array.isRequired
};

export default MessageContainer;
