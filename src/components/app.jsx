import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    }

    decreaseFunction() {
        console.log('this is just a test 2');
        this.props.dispatch({ type: 'decrease' });
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
