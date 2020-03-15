import React, { Component } from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';
import base64 from 'react-native-base64';
import { MarkdownView } from 'react-native-markdown-view';
import Markdown from 'react-native-markdown-renderer';
import { ScrollView, Dimensions } from 'react-native';
// import Markdown from 'react-native-markdown-package';
import { Base64 } from 'js-base64';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';



import { Container,
    Name,
    Bio,
    InfoText } from './styles';

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
        console.tron.log("REPOOOO: ", data)

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
