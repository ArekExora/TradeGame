'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import apiService from './../services/apiService';
import socket from './../services/socket';
import user from './../services/personalisationService';

import MainContainer from './mainContainer';
import Chat from './chat';

export class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.increaseFunction = this.increaseFunction.bind(this);
        this.decreaseFunction = this.decreaseFunction.bind(this);

        user.userId = Math.floor(Math.random() * 100);
        user.userName = 'User' + user.userId;
        user.userAvatar = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Mao_Zedong_1963_%28cropped%29.jpg'

        socket.on('news', function (data) {
            console.log('En news', data);
        });

        socket.on('private', function (data) {
            console.log('En private', data);
            socket.emit('private', {msg: 'Thank you for your message'});
        });
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
                <Chat />
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
