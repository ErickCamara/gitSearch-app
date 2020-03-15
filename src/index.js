import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import './config/ReactotronConfig';

import Routes from './routes';

export default class App extends Component {
    constructor(props) {
        OneSignal.init('1f0f7fbe-93af-421b-9feb-2b1c390399c7');
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived = (data) => {

    }
    onOpened = (notification) => {

    }
    onIds = (id) => {

    }

    render() {
        return (
            <>
                <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
                <Routes/>
            </>
        );
    }
    };

export default CodePush({
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
