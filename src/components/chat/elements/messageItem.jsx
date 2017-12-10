'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import user from '../../../services/personalisationService';

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

const generateStyle = ({userAvatar}) => ({
    backgroundImage: 'url(' + userAvatar + ')'
});

const MessageItem = ({ message }) => (
    <div className={generateClasses('chat__message', message)}>
        <div className={generateClasses('chat__avatar', message)} style={generateStyle(message)}> </div>
        <div className={generateClasses('chat__message-arrow', message)}> </div>
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

MessageItem.propTypes = {
    message: PropTypes.object.isRequired
};

export default MessageItem;
