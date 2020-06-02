import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Delete,
    DeleteBtn,
    Title,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
    Refresh,
    RefreshText } from './styles';

export default class FindUser extends Component {
    static navigationOptions = {
        title: 'Encontrar Usuários',

    };
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    state = {
        newUser: '',
        users: [],
        loading: false,
    };

    async componentDidMount() {
        const users = await AsyncStorage.getItem('users');
        if (users) {
            this.setState({ users: JSON.parse(users) })
        }
    }
    componentDidUpdate(_, prevState){
        const { users } = this.state;

        if (prevState != users) {
            AsyncStorage.setItem('users', JSON.stringify(users))
        }
    }
    handleAddUser = async () => {
        const { users, newUser } = this.state;

        this.setState({loading: true});
        try {
            const response = await api.get(`/users/${newUser}`);

            const data = {
                name: response.data.name,
                login: response.data.login,
                bio: response.data.bio,
                avatar: response.data.avatar_url,
                key: response.data.full_name,
            };

            for (let i = 0; i <= users.length; i++) {

                if(users == null || users == ''){
                    this.setState({
                        users: [ ... users, data],
                        newUser: '',
                        loading: false,
                    });
                }else {
                    if(users.every((item) => item.login !== data.login)) {
                        this.setState({
                            users: [ ... users, data],
                            newUser: '',
                            loading: false,
                        });
                    }
                    else{
                        alert('Info','Usuário já cadastrado')
                        this.setState({
                            loading: false,
                        })
                    }
                }
            }
        } catch (error) {
            alert('O usuário digitado não existe, por favor tente novamente')
            this.setState({
                loading: false,
            })
        }

        Keyboard.dismiss();
    }
    removeUser = async (login) => {
        const { users } = this.state;

        for (let i = 0; i < users.length; i++) {

            if (users[i].login == login){

                var index = users.findIndex(users => users.login === login)
                if (index !== -1) {
                    users.splice(index, 1);
                    this.setState({
                        users: users
                    })
                }
            }
        }
    }
    refreshUser = async (login) => {
        const { users} = this.state;
        const response = await api.get(`/users/${login}`);

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
            key: response.data.full_name,
        };

        var index = users.findIndex(users => users.login === login)
        users[index] = data;

        this.setState({
            users: users,
            newUser: '',
            loading: false,
        });

    }
        handleNavigate = (user) => {
            const { navigation } = this.props;

            navigation.navigate('User', { user });
        }

    render() {
        const { users, newUser, loading } = this.state;
        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={newUser}
                        onChangeText={text => this.setState({ newUser: text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    />
                    <SubmitButton loading={loading } onPress={this.handleAddUser}>
                        { loading ? <ActivityIndicator color="#FFF"/> : <Icon name="add" size={20} color="#fff"/>}
                    </SubmitButton>
                </Form>
                <List
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={( {item} ) => (
                        <User>
                            <Title>
                                <Delete>
                                    <DeleteBtn onPress={() => this.removeUser(item.login)}><Icon name="delete" size={20} color="#7159c1"/></DeleteBtn>
                                </Delete>
                                <Avatar source={{ uri: item.avatar }}/>
                                <Name>{item.name}</Name>
                                <Bio>{item.bio}</Bio>
                            </Title>
                            <Refresh onPress={() => this.refreshUser(item.login)}>
                                <Icon name="refresh" size={20} color="#7159c1"/>
                                <RefreshText>ATUALIZAR</RefreshText>
                            </Refresh>
                            <ProfileButton onPress={() => this.handleNavigate(item)}>
                                <ProfileButtonText>ver Perfil</ProfileButtonText>
                            </ProfileButton>

                        </User>
                    )}
                />
            </Container>
        );
    }
}
