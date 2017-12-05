'use strict';

import socket from './../services/socket';
import user from './../services/personalisationService';

const generateMsg = ({userName, userId, userAvatar}, text) => ({ userName, userId, userAvatar, text });

const initialState = [
    generateMsg({userName:'Admin', userId: 0, userAvatar:'https://pbs.twimg.com/profile_images/604172322744963073/Q6xDLL_D.png'}, 'GO! START THE REVOLUTION!'),
    generateMsg({userName:'User1', userId: 1, userAvatar:'https://78.media.tumblr.com/avatar_478e09392730_128.png'}, 'The solution to our problems is easy'),
    generateMsg({userName:'User1', userId: 1, userAvatar:'https://78.media.tumblr.com/avatar_478e09392730_128.png'}, 'we should just'),
    generateMsg({userName:'User1', userId: 1, userAvatar:'https://78.media.tumblr.com/avatar_478e09392730_128.png'}, 'socialize the means of production'),
    generateMsg({userName:'User2', userId: 2, userAvatar:'https://www.biografiasyvidas.com/biografia/s/fotos/stalin.jpg'}, 'That should work')
];
initialState[1].sameDown = initialState[2].sameUp = initialState[2].sameDown = initialState[3].sameUp = true;

    let messageCount = 1;

export default function(state = initialState, action) {
    console.log(action);
    let newMessage;
    switch (action.type) {
        case 'sendMessage':
            //Generate the message and send it to the server.
            newMessage = generateMsg(user, action.text);
            newMessage.order = messageCount++;
            setTimeout(() => {
                const delayedMessage = generateMsg(user, newMessage.text);
                delayedMessage.order = newMessage.order;
                console.log('Enviamos un chat: ', delayedMessage);
                socket.emit('chat', delayedMessage);
            }, 2000);
            // console.log('Enviamos un chat: ', newMessage);
            // socket.emit('chat', newMessage);

            //Check if the sender is the same as the previous one and flag it.
            if (state.length > 0 && state[state.length-1].userId === newMessage.userId){
                state[state.length-1].sameDown = newMessage.sameUp = true;
            }

            //Flag it as pending before adding it to the state.
            newMessage.isPending = true;
            return [...state, newMessage];

        case 'receiveMessage':
            let newState;

            //Generate the message.
            newMessage = Object.assign({}, action.msg);
            // newMessage = generateMsg(action.message.user, action.message.text);

            //Check if the user is the sender, and if so remove the pending flag.
            if (newMessage.userId === user.userId) {
                newState = state.map((msg) => {
                   if (msg.order === newMessage.order) {
                       delete msg.isPending;
                   }
                   return msg;
                });
            } else {
                //Check if the sender is the same as the previous one and flag it.
                if (state.length > 0 && state[state.length-1].userId === newMessage.userId){
                    state[state.length-1].sameDown = newMessage.sameUp = true;
                }

                newState = [...state, newMessage];
            }
            delete newMessage.order;

            return newState;

        default:
            return state;
    }
};
