'use strict';

const initialState = 0;

export default function(state = initialState, action) {
    switch (action.type) {
        case 'increase':
            return state + 1;

        case 'decrease':
            return state - 1;

        default:
            return state;
    }
}
