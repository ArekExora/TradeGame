'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import user from './../../services/personalisationService';

const calculateMessageColors = (senderId) => {
    const ADMIN_ID = 0;
    const userColors = {
        admin: { background: '#ec5858d4', border: '#8e3c3cd4' },
        self: { background: 'lightblue', border: 'blue' },
        other: { background: 'lightgreen', border: 'green' }
    };

    if (senderId === ADMIN_ID){
        return userColors.admin;
    } else if (senderId === user.userId) {
        return userColors.self;
    } else {
        return userColors.other;
    }
};

const generateStyle = ({ userId, sameUp, sameDown, isPending }) => {
    const messageColors = calculateMessageColors(userId);
    const borderStyle = '2px solid ' + messageColors.border;

    const container = {
        backgroundColor: messageColors.background,
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

const generateClasses = ({ userId, sameUp, sameDown, isPending }) => {
    const ADMIN_ID = 0;
    let generatedClasses = '';
    //Bubble options.
    if (sameUp && sameDown) {
        generatedClasses += 'chat__message--middle ';
    } else if (sameUp) {
        generatedClasses += 'chat__message--bottom ';
    } else if (sameDown) {
        generatedClasses += 'chat__message--top ';
    } else {
        generatedClasses += 'chat__message--single '; //Possibly this is not needed.
    }

    //Pending status.
    generatedClasses += isPending ? 'chat__message--pending ' : '';

    //Author.
    if (userId === ADMIN_ID){
        generatedClasses += 'chat__message--admin ';
    } else if (userId === user.userId) {
        generatedClasses += 'chat__message--self ';
    } else {
        generatedClasses += 'chat__message--other ';
    }

    return generatedClasses;
};

const MessageItem = ({ message }) => {
    const style = generateStyle(message);
    const className = 'chat__message ' + generateClasses(message)

    return (
        <div className={className} style={style.container}>
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
