import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FindUser from './pages/FindUser';
import User from './pages/User';
import Menu from './pages/Menu';
import Repositories from './pages/Repositories'
import Readme from './pages/Readme';

const Routes = createAppContainer(
    createStackNavigator({
        Menu,
        FindUser,
        Repositories,
        User,
        Readme,
    }, {
        defaultNavigationOptions: {
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7159c1',
            },
            headerTintColor: '#fff',
        }
    })
);

export default Routes;
