import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

export default class Readme extends Component {
    static navigationOptions = {
        title: 'README',

    };
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };
    state = {
        login: '',
        repo: '',
    };

    async componentDidMount() {
        const data = this.props.navigation.getParam('data');

        this.setState({
            login: data,
        });
    }

    render() {
        const { repo, login } = this.state;

        return (
            // <InfoText></InfoText>
                <WebView
                    source={{ uri: 'https://github.com/' + login}}
                />
        );
    }
}
