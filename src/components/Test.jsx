import React, { PropTypes } from 'react';

const Test = ({ prop1, prop2 }) => {
    return (
        <div>
            <h1>{prop1}</h1>
            <h3>{prop2}</h3>
        </div>
    );
};

// Test.propTypes = {
//     prop1: PropTypes.string.isRequired,
//     prop2: PropTypes.string.isRequired
// };

export default Test;