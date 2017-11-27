'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const generateStyle = ({ sameUp, sameDown, isPending }) => {
    const borderStyle = '1px solid green';

    const container = {
        backgroundColor: 'lightgreen',
        backgroundImage: isPending ? 'url("icons/loading.gif")' : '',
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '15px',
        borderBottom: sameDown ? 'none' : borderStyle,
        borderLeft: borderStyle,
        borderRight: borderStyle,
        borderTop: sameUp ? 'none' : borderStyle,
        borderRadius: (sameUp ? '0 0 ' : '5px 5px ') + (sameDown ? '0 0' : '5px 5px'),
        marginBottom: sameDown ? '0' : '5px',
        marginLeft: '5px',
        marginRight: '5px',
        marginTop: sameUp ? '0' : '5px',
        paddingBottom: sameDown ? '0' : '5px',
        paddingLeft: '5px',
        paddingRight: '0',
        paddingTop: sameUp ? '0' : '5px',
        width: '95%'
    };

    const author = {
        fontWeight: 'bold',
        visibility : sameUp ? 'hidden' : 'visible'
    };

    const text = {
        color: isPending ? 'grey' : 'inherit',
        paddingLeft: '5px',
        transition: 'color 1s'
    };

    return { container, author, text };
};

const MessageItem = ({ message }) => {
    const style = generateStyle(message);

    return (
        <div className='chatMessage' style={style.container}>
            <span style={style.author}>
                {message.userName}
            </span>
            <span style={style.text}>
                {message.text}
            </span>
        </div>
    );
};

MessageItem.propTypes = {
    message: PropTypes.object.isRequired
};

export default MessageItem;
