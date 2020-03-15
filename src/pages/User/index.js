import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native'

import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnnerAvatar, Info, Title, Author, Body } from './styles';

export default class User extends Component {

    static navigationOptions = ( { navigation } ) => ({
        title: navigation.getParam('user').name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func,
        }).isRequired,
    };
    state = {
        stars: [],
        loading: false,
    };

    async componentDidMount() {

        const user = this.props.navigation.getParam('user');

        const response = await api.get(`/users/${user.login}/starred`);
        console.tron.log('DADOS DO RESPONSE: ', response)
        this.setState({ stars: response.data, loading: true });
    }
    render() {
        const { stars, loading } = this.state;
        const user = this.props.navigation.getParam('user');
        console.tron.log('STARS VALUE: ', loading)

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }}/>
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>
                <Body loading={loading}>
                    {   loading
                        ?
                            <Stars
                                data={stars}
                                keyExtractor={stars => String(stars.id)}
                                renderItem={({item}) => (
                                    <Starred>
                                        <OwnnerAvatar source={{ uri: item.owner.avatar_url}} />
                                        <Info>
                                            <Title>{item.name}</Title>
                                            <Author>{item.owner.login}</Author>
                                        </Info>
                                    </Starred>
                                )}
                            />
                        :
                        <ActivityIndicator color="#a99" size={70}/>

                    }
                </Body>
            </Container>
          );
    }
}
