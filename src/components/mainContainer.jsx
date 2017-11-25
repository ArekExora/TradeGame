'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Button from './button';

const fn1 = () => {
    console.log('Funcion1');
};
const fn2 = () => {
    console.log('Funcion2');
};

const MainContainer = ({ increaseFn, decreaseFn }) => (
    <div>
        <Button onClick={fn1} text={'Opcion1'} />
        <Button onClick={fn2} text={'Opcion2'} />
        <Button onClick={increaseFn} text={'Increase'} />
        <Button onClick={decreaseFn} text={'Decrease'} />
    </div>
);

MainContainer.propTypes = {
    increaseFn: PropTypes.func.isRequired,
    decreaseFn: PropTypes.func.isRequired
};

export default MainContainer;
