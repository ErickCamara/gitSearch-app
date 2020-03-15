import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { View } from 'react-native';

import { Container, SubmitButton, UserText, Logo, Body, LogoImg, LogoText } from './styles';

export default class Menu extends Component {
  state = {
      loading: false,
  }
  navigationToUser() {

  }
  navigateUser = () => {
    const { navigation } = this.props;
    this.setState({loading: true});

    navigation.navigate('FindUser');
    this.setState({loading: false});

  }
  navigateProject = () => {
    const { navigation } = this.props;
    this.setState({loading: true});

    navigation.navigate('Repositories');
    this.setState({loading: false});

  }
  render() {
    const { loading } = this.state
    return (
        <Container>
            <Logo>
                <LogoImg source={require('../../assets/images/octoSearch.png')}/>
                <LogoText source={require('../../assets/images/gitSearch.png')}/>
            </Logo>

            <Body>
                <SubmitButton loading={loading } onPress={this.navigateUser}>
                    { loading ? <ActivityIndicator size={70} color="#FFF"/> : <Icon name="person" size={70} color="#fff"/>}
                <UserText>   Find User   </UserText>
                </SubmitButton>
                <SubmitButton loading={loading } onPress={this.navigateProject}>
                    { loading ? <ActivityIndicator size={70} color="#FFF"/> : <Icon name="assignment" size={70} color="#fff"/>}
                    <UserText> Find {"\n"} Repository </UserText>
                </SubmitButton>
            </Body>
        </Container>

    );
  }
}
