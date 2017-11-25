'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import apiService from './../services/apiService';

import MainContainer from './mainContainer';

export class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.increaseFunction = this.increaseFunction.bind(this);
        this.decreaseFunction = this.decreaseFunction.bind(this);
    }

    increaseFunction() {
        console.log('this is just a test 1');
        this.props.dispatch({ type: 'increase' });

        apiService.get('12')
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    decreaseFunction() {
        console.log('this is just a test 2');
        this.props.dispatch({ type: 'decrease' });

        apiService.get('')
            .then(data => console.log(data.message))
            .catch(error => console.log(error));
    }

    render() {
        document.body.style.margin = '0';
        return (
            <div>
                <MainContainer increaseFn={this.increaseFunction} decreaseFn={this.decreaseFunction}/>
                <div>Counter: {this.props.counter}</div>
            </div>
        );
    }
}

App.propTypes = {
    counter: PropTypes.number.isRequired
};

export default connect(state => ({
    counter: state.counter
}))(App);
