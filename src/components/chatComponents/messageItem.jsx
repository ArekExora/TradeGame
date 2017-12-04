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

const generateClasses = (basicClass, { userId, sameUp, sameDown, isPending }) => {
    const ADMIN_ID = 0;
    const generatedClasses = [basicClass];

    //Bubble options.
    if (sameUp && sameDown) {
        generatedClasses.push(basicClass + '--middle');
    } else if (sameUp) {
        generatedClasses.push(basicClass + '--bottom');
    } else if (sameDown) {
        generatedClasses.push(basicClass + '--top');
    } else {
        generatedClasses.push(basicClass + '--single');
    }

    //Pending status.
    if (isPending) {
        generatedClasses.push(basicClass + '--pending');
    }

    //Author.
    if (userId === ADMIN_ID){
        generatedClasses.push(basicClass + '--admin');
    } else if (userId === user.userId) {
        generatedClasses.push(basicClass + '--self');
    } else {
        generatedClasses.push(basicClass + '--other');
    }

    return generatedClasses.join(' ');
};

const MessageItem = ({ message }) => {
    return (
        <div className={generateClasses('chat__message', message)}>
            <div className={generateClasses('chat__avatar', message)}></div>
            <div className={generateClasses('chat__message-arrow', message)}></div>
            <div className={generateClasses('chat__text-container', message)}>
                <div className={generateClasses('chat__sender', message)}>
                    {message.userName}
                </div>
                <div className={generateClasses('chat__text', message)}>
                    {message.text}
                </div>
            </div>
        </div>
    );
};

MessageItem.propTypes = {
    message: PropTypes.object.isRequired
};

export default MessageItem;
