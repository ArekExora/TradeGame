'use strict';

const initialState = [
    {from:'Admin', text:'Welcome'}
];

export default function(state = initialState, action) {
    switch (action.type) {
        case 'receivedMessage':
            return [...state, action.msg];

        default:
            return state;
    }
};
