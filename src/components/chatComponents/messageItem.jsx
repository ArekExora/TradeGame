'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const injectStyle = (style) => {
    console.log('ENTRA');
    const styleElement = document.createElement('style');
    let styleSheet = null;

    document.head.appendChild(styleElement);

    styleSheet = styleElement.sheet;

    styleSheet.insertRule(style, styleSheet.cssRules.length);
};

const keyframesStyle = `
    @-webkit-keyframes rotate {
        0%   { transform: rotate(360deg);   }
        50%  { transform: rotate(180deg); }
        100% { transform: rotate(0deg); }
    }
`;
injectStyle(keyframesStyle);

const generateStyle = ({ sameUp, sameDown, isPending }) => {
    const borderStyle = '1px solid green';

    const container = {
        backgroundColor: 'lightgreen',
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

    const loadingIcon = {
        display: isPending ? '' : 'none',
        height: '16px',
        float: 'right',
        transition: 'display 1s',
        WebkitAnimation: 'rotate 2s linear infinite',
        width: '16px'
    };

    return { container, author, text, loadingIcon };
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
            <img style={style.loadingIcon} src='icons/loading.svg' alt='Loading'/>
        </div>
    );
};

MessageItem.propTypes = {
    message: PropTypes.object.isRequired
};

export default MessageItem;
