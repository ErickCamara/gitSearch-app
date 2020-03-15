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
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
    Info,
    InfoText,
    Star,
    InfoTitle } from './styles';

export default class Repositories extends Component {

    //SET PAGE TITLE
    static navigationOptions = {
        title: 'Encontrar Repositórios',

    };

    //SET NAVIGATION PROPS
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    //SET INITIAL STATES
    state = {
        newRepos: '',
        data: [],
        repos: [],
        loading: false,
    };

    //FUNCTION TO RETURN ALL REPOSITORIES THAT CONTAINS THE KEY WORD THAT WAS SET ON newRepos VARIABLE
    handleFindRepo = async () => {
        const { repos, newRepos } = this.state;

        this.setState({loading: true, data: ''});

        const response = await api.get(`/search/repositories?q=${newRepos}`);

        for (var i = 0; i < response.data.items.length; i++) {
            const {data, repos } = this.state;
            const element = response.data.items[i];

            if(repos.every((item) => item.id !== element.id)){
                const dado = {
                    id: element.id,
                    avatar_url: element.owner.avatar_url,
                    full_name: element.full_name,
                    description: element.description,
                    starred: false,
                    starColor: '#000',
                    starType: 'star-border'

                }
                this.setState({
                    data: [ ... data, dado ],
                })
            }
            else{
                const dado = {
                    id: element.id,
                    avatar_url: element.owner.avatar_url,
                    full_name: element.full_name,
                    description: element.description,
                    starred: true,
                    starColor: '#7159c1',
                    starType: 'star'

                }
                this.setState({
                    data: [ ... data, dado ],
                })
            }
        }

        this.setState({
            repos: [ ... repos, ],
            newRepos: '',
            loading: false,
            repoID: response.data.items.id,
        });

        Keyboard.dismiss();
    }

    async componentDidMount() {
        const repos = await AsyncStorage.getItem('repos');

        if (repos) {
            this.setState({ repos: JSON.parse(repos),
                            data: JSON.parse(repos) })
        }
    }
    componentDidUpdate(_, prevState){
        const { repos } = this.state;

        if (prevState != repos) {
            AsyncStorage.setItem('repos', JSON.stringify(repos))
        }
    }

    starred = async (item) => {
        const { repos, data  } = this.state;
        const repoID = item.id;

        const response = await api.get(`/repositories/${repoID}`);

        const dado = {
            id: response.data.id,
            avatar_url: response.data.owner.avatar_url,
            full_name: response.data.full_name,
            description: response.data.description,
            starred: true,
            starColor: '#7159c1',
            starType: 'star',

        };
        for (let i = 0; i <= repos.length; i++) {

            if (repos == '' || repos == null) {
                var index = data.findIndex(data => data.id === item.id)

                data[index] = dado;

                this.setState({
                    data: data,
                    repos: [ ... repos, dado],
                })
            }
            else{
                if (repos.every((item) => item.id !== dado.id)) {
                    var index = data.findIndex(data => data.id === item.id)

                    data[index] = dado;

                    this.setState({
                        data: data,
                        repos: [ ... repos, dado],
                    })
                }
            }
        }
    }

    removeStarred = async (id, name) => {
        const { repos, data  } = this.state;
        console.tron.log('DATA DENTRO DO REMOVE: ', data)
        console.tron.log('REPOS DENTRO DO REMOVE: ', repos)
        for (let i = 0; i < repos.length; i++) {

            var index = repos.findIndex(repos => repos.id === id)
            if (index !== -1) {
                repos.splice(index, 1);
                this.setState({
                    data: repos,
                })
            }

        }
    }

    handleNavigate = (data) => {
        const { navigation } = this.props;

        navigation.navigate('Readme', { data });
    }
    render() {
        const { data, newRepos, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Procurar Repositório..."
                        value={newRepos}
                        onChangeText={text => this.setState({ newRepos: text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleFindRepo}
                    />
                    <SubmitButton loading={loading } onPress={this.handleFindRepo}>
                        { loading ? <ActivityIndicator color="#FFF"/> : <Icon name="search" size={20} color="#fff"/>}
                    </SubmitButton>
                </Form>
                <List
                    data={data}
                    keyExtractor={data => data.full_name}
                    renderItem={( {item} ) => (
                        <User>
                            <Info>
                                <Avatar source={{ uri: item.avatar_url }}/>
                                <InfoText>
                                    <InfoTitle>
                                        <Name>{item.full_name}</Name>
                                        { item.starred
                                            ?
                                                <Star  onPress={() => this.removeStarred(item.id, item.full_name)}><Icon name={item.starType} size={20} color={item.starColor}/></Star>
                                            :
                                                <Star  onPress={() => this.starred(item)}><Icon name={item.starType} size={20} color={item.starColor}/></Star>
                                        }

                                    </InfoTitle>

                                    <Bio>{item.description}</Bio>
                                </InfoText>
                            </Info>
                            <ProfileButton onPress={() => this.handleNavigate(item.full_name)}>
                                <ProfileButtonText>Ver Repositório</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />
            </Container>
        );
    }
}
